use crate::clients::SdClient;
use std::{fmt::Display, str::FromStr};

use mongodb::{
    bson::{doc, Document},
    Client,
};
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
pub enum AppointmentError {
    IdCreate(String),
    BsonDocCreate(String),
    UpdateAppointment(String),
}

impl Display for AppointmentError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            AppointmentError::IdCreate(err) => write!(f, "Error parsing ID: {}", err),
            AppointmentError::BsonDocCreate(bsonErr) => write!(
                f,
                "Error creating Bson Document from Appointment: {}",
                bsonErr
            ),
            AppointmentError::UpdateAppointment(err) => {
                write!(f, "Error updating appointment: {}", err)
            }
        }
    }
}

// TODO: Remove Debug. Implement Display
#[derive(Serialize, Deserialize, Debug)]
pub struct Appointment {
    pub client_id: String,
    pub purpose: String,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub notes: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub charge: Option<u32>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub payment: Option<u32>,
}

#[tauri::command]
pub async fn add_appointment(
    appt: Appointment,
    client: tauri::State<'_, Client>,
) -> Result<String, AppointmentError> {
    let bson_client_id = mongodb::bson::oid::ObjectId::from_str(appt.client_id.as_str())
        .map_err(|e| AppointmentError::IdCreate(e.to_string()))?;
    let serialized_appt = mongodb::bson::to_bson(&appt)
        .map_err(|e| AppointmentError::BsonDocCreate(e.to_string()))?;

    println!("{:?}", appt);
    println!("{:?}", serialized_appt);

    let result = client
        .database("sabayle")
        .collection::<SdClient>("clients")
        .update_one(
            doc! {"_id": bson_client_id},
            doc! { "$set": serialized_appt },
            None,
        )
        .await
        .map_err(|e| AppointmentError::UpdateAppointment(e.to_string()))?;

    println!("{:?}", bson_client_id);

    Ok("Result".to_uppercase())
}
