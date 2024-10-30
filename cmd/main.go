package main

import (
	"embed"
	"log"
	"net/http"
	"path/filepath"

	"github.com/vearutop/statigz"
	"github.com/vearutop/statigz/brotli"
)

//go:embed dist/*
var publicDir embed.FS

func main() {
	staticFileServer := statigz.FileServer(publicDir, brotli.AddEncoding)

	h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Add .html extension where omitted
		ext := filepath.Ext(r.URL.Path)
		if ext == "" && r.URL.Path != "/" {
			r.URL.Path += ".html"
		}

		// Add dist prefix
		r.URL.Path = "dist" + r.URL.Path

		// CORS
		w.Header().Set("Access-Control-Allow-Origin", "https://*.instagram.com")

		// Static file server
		staticFileServer.ServeHTTP(w, r)
	})

	mux := http.NewServeMux()

	mux.Handle("GET /", h)

	log.Fatal(http.ListenAndServe(":8080", mux))
}
