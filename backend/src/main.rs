use std::io::Write;

use actix_multipart::Multipart;
use actix_web::{middleware, web, App,post, Error, HttpResponse, HttpServer};
use futures_util::TryStreamExt as _;
use uuid::Uuid;
use actix_cors::Cors;


#[post("/upload")]
async fn save_file(mut payload: Multipart) -> Result<HttpResponse, Error> {
    // iterate over multipart stream
    while let Some(mut field) = payload.try_next().await? {
        // A multipart/form-data stream has to contain `content_disposition`
        let content_disposition = field
            .content_disposition()
            .ok_or_else(|| HttpResponse::BadRequest().finish())?;

        let filename = content_disposition.get_filename().map_or_else(
            || Uuid::new_v4().to_string(),
            |f| sanitize_filename::sanitize(f),
        );
        let filepath = format!("./tmp/{}", filename);

        // File::create is blocking operation, use threadpool
        let mut f = web::block(|| std::fs::File::create(filepath)).await?;

        // Field in turn is stream of *Bytes* object
        while let Some(chunk) = field.try_next().await? {
            // filesystem operations are blocking, we have to use threadpool
            f = web::block(move || f.write_all(&chunk).map(|_| f)).await?;
        }
    }

    Ok(HttpResponse::Ok().into())
}

fn index() -> HttpResponse {
    let html = r#"<html>
        <head><title>Upload Test</title></head>
        <body>
            <p>Hello, welcome</p>
        </body>
    </html>"#;

    HttpResponse::Ok().body(html)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "info");
    std::fs::create_dir_all("./tmp")?;

    HttpServer::new(|| {
        let cors = Cors::permissive();
        App::new().wrap(middleware::Logger::default())
        .wrap(cors)
        .service(
            web::resource("/")
                .route(web::get().to(index)),
        )
        .service(save_file)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}