// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use futures::TryStreamExt;
use mongodb::{
    bson::{doc, Document},
    options::ClientOptions,
    Client,
};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let client = init_mongo().await?;

    tauri::Builder::default()
        .manage(client)
        .invoke_handler(tauri::generate_handler![
            greet,
            get_headers,
            fetch_clients,
            fetch_client_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}

async fn init_mongo() -> mongodb::error::Result<Client> {
    let uri = "mongodb://127.0.0.1:27017/?maxPoolSize=20&w=majority";
    let client_options = ClientOptions::parse_async(uri).await?;

    let client = Client::with_options(client_options)?;
    client
        .database("sabayle")
        .run_command(doc! { "ping": 1 }, None)
        .await?;

    println!("Connected to database.");

    Ok(client)
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}", name)
}

#[tauri::command]
async fn fetch_clients(client: tauri::State<'_, Client>) -> Result<Vec<Document>, ()> {
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
async fn fetch_client_data(id: String, client: tauri::State<'_, Client>) -> Result<Document, ()> {
    println!("Client ID from Client: {}", id);
    let data = client
        .database("sabayle")
        .collection("clients")
        .find_one(doc! { "_id": id }, None)
        .await
        .unwrap();

    if let Some(d) = data {
        Ok(d)
    } else {
        Err(())
    }
}

#[tauri::command]
fn get_headers() -> Vec<String> {
    let vec: Vec<String> = vec!["Name".to_string(), "Address".to_string()];

    vec
}
