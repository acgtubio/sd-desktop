use std::{error::Error, str::FromStr};

use mongodb::{
    bson::{doc, Document},
    Client,
};
use serde::{Deserialize, Serialize};

// TODO: Remove Debug. Implement Display
#[derive(Serialize, Deserialize, Debug)]
pub struct Appointment {
    pub client_id: String,
    pub purpose: String,
    pub notes: Option<String>,
    pub charge: Option<u32>,
    pub payment: Option<u32>,
}

#[tauri::command]
pub async fn add_appointment(
    appt: Appointment,
    client: tauri::State<'_, Client>,
) -> Result<String, ()> {
    let bson_client_id;
    if let Ok(res) = mongodb::bson::oid::ObjectId::from_str(appt.client_id.as_str()) {
        bson_client_id = res;
    } else {
        return Err(());
    }

    println!("{:?}", appt);
    println!("{:?}", bson_client_id);

    Ok("Result".to_uppercase())
}
