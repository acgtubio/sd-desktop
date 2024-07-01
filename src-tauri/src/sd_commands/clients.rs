use futures::TryStreamExt;
use mongodb::{
    bson::{doc, Document},
    Client,
};
use std::str::FromStr;

#[tauri::command]
pub async fn fetch_clients(client: tauri::State<'_, Client>) -> Result<Vec<Document>, ()> {
    let mut data = client
        .database("sabayle")
        .collection("clients")
        .find(None, None)
        .await
        .unwrap();

    let mut results = Vec::new();
    while let Some(result) = data.try_next().await.unwrap() {
        results.push(result)
    }

    Ok(results)
}

#[tauri::command]
pub async fn fetch_client_data(id: &str, client: tauri::State<'_, Client>) -> Result<Document, ()> {
    let bson_id = mongodb::bson::oid::ObjectId::from_str(id).unwrap();
    let data = client
        .database("sabayle")
        .collection("clients")
        .find_one(Some(doc! { "_id": bson_id}), None)
        .await
        .unwrap();

    if let Some(d) = data {
        Ok(d)
    } else {
        Err(())
    }
}
