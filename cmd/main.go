package main

import (
	"fmt"
	"log"
	"net/http"
	"path/filepath"

	staticAssets "github.com/turnerbenjamin/tob_go/cmd/static"
	"github.com/vearutop/statigz"
	"github.com/vearutop/statigz/brotli"
)

func main() {
	staticAssets.CompressFiles()

	staticFileServer := statigz.FileServer(staticAssets.FileSystem, brotli.AddEncoding)

	h := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		p := r.URL.Path
		ext := filepath.Ext(p)
		if ext == "" && p != "/" {
			r.URL.Path += ".html"
		}
		fmt.Println(ext)
		staticFileServer.ServeHTTP(w, r)
		w.WriteHeader(200)
	})

	mux := http.NewServeMux()

	mux.Handle("GET /", h)

	log.Fatal(http.ListenAndServe(":8080", mux))
}
