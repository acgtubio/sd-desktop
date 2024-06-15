// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_headers])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}", name)
}

#[tauri::command]
fn get_headers() -> Vec<String> {
    let vec: Vec<String> = vec!["Name".to_string(), "Address".to_string()];

    vec
}
