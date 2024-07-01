// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod sd_commands;
use sd_commands::{appointment, clients};

use mongodb::{bson::doc, options::ClientOptions, Client};

#[tokio::main]
async fn main() -> mongodb::error::Result<()> {
    let client = init_mongo().await?;

    tauri::Builder::default()
        .manage(client)
        .invoke_handler(tauri::generate_handler![
            get_headers,
            appointment::add_appointment,
            clients::fetch_clients,
            clients::fetch_client_data,
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
fn get_headers() -> Vec<String> {
    let vec: Vec<String> = vec!["Name".to_string(), "Address".to_string()];

    vec
}
