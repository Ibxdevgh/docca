#!/bin/bash

# URL Downloader Script
# Downloads files from URLs and organizes them into folders based on URL path structure

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to display usage
usage() {
    echo "Usage: $0 [OPTIONS] <URL1> [URL2] [URL3] ..."
    echo ""
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  -v, --verbose  Enable verbose output"
    echo "  -f, --file     Read URLs from a file (one URL per line)"
    echo ""
    echo "Examples:"
    echo "  $0 https://example.com/models/file.glb"
    echo "  $0 -f urls.txt"
    echo "  $0 -v https://site.com/assets/model.obj https://site.com/textures/image.png"
}

# Function to log messages
log() {
    local level=$1
    shift
    local message="$@"
    
    case $level in
        "INFO")
            echo -e "${BLUE}[INFO]${NC} $message"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[SUCCESS]${NC} $message"
            ;;
        "WARNING")
            echo -e "${YELLOW}[WARNING]${NC} $message"
            ;;
        "ERROR")
            echo -e "${RED}[ERROR]${NC} $message"
            ;;
    esac
}

# Function to extract path from URL
extract_path() {
    local url="$1"
    # Remove protocol and domain, keep only the path
    echo "$url" | sed 's|^https\?://[^/]*/||'
}

# Function to extract filename from path
extract_filename() {
    local path="$1"
    basename "$path"
}

# Function to extract directory from path
extract_directory() {
    local path="$1"
    dirname "$path"
}

# Function to download and organize file
download_file() {
    local url="$1"
    local verbose="$2"
    
    # Extract components from URL
    local path=$(extract_path "$url")
    local filename=$(extract_filename "$path")
    local directory=$(extract_directory "$path")
    
    # Handle root directory case
    if [ "$directory" = "." ]; then
        directory=""
    fi
    
    # Create target directory structure
    local target_dir="$PWD/$directory"
    local target_file="$target_dir/$filename"
    
    log "INFO" "Processing: $url"
    
    if [ "$verbose" = "true" ]; then
        log "INFO" "  Path: $path"
        log "INFO" "  Directory: $directory"
        log "INFO" "  Filename: $filename"
        log "INFO" "  Target: $target_file"
    fi
    
    # Create directory if it doesn't exist
    if [ -n "$directory" ]; then
        if ! mkdir -p "$target_dir" 2>/dev/null; then
            log "ERROR" "Failed to create directory: $target_dir"
            return 1
        fi
        
        if [ "$verbose" = "true" ]; then
            log "INFO" "  Created directory: $target_dir"
        fi
    fi
    
    # Download the file
    if [ "$verbose" = "true" ]; then
        log "INFO" "  Downloading..."
        if curl -L --fail --show-error --progress-bar -o "$target_file" "$url"; then
            log "SUCCESS" "Downloaded: $filename -> $target_file"
        else
            log "ERROR" "Failed to download: $url"
            return 1
        fi
    else
        if curl -L --fail --silent --show-error -o "$target_file" "$url"; then
            log "SUCCESS" "Downloaded: $filename -> $target_file"
        else
            log "ERROR" "Failed to download: $url"
            return 1
        fi
    fi
    
    return 0
}

# Function to read URLs from file
read_urls_from_file() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        log "ERROR" "File not found: $file"
        return 1
    fi
    
    # Read URLs from file, skip empty lines and comments
    grep -v '^#' "$file" | grep -v '^$'
}

# Main function
main() {
    local verbose=false
    local url_file=""
    local urls=()
    
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                usage
                exit 0
                ;;
            -v|--verbose)
                verbose=true
                shift
                ;;
            -f|--file)
                url_file="$2"
                shift 2
                ;;
            -*)
                log "ERROR" "Unknown option: $1"
                usage
                exit 1
                ;;
            *)
                urls+=("$1")
                shift
                ;;
        esac
    done
    
    # Check if curl is available
    if ! command -v curl &> /dev/null; then
        log "ERROR" "curl is required but not installed"
        exit 1
    fi
    
    # Collect URLs
    if [ -n "$url_file" ]; then
        log "INFO" "Reading URLs from file: $url_file"
        while IFS= read -r url; do
            if [ -n "$url" ]; then
                urls+=("$url")
            fi
        done < <(read_urls_from_file "$url_file")
    fi
    
    # Check if we have any URLs to process
    if [ ${#urls[@]} -eq 0 ]; then
        log "ERROR" "No URLs provided"
        usage
        exit 1
    fi
    
    log "INFO" "Starting download of ${#urls[@]} file(s)..."
    
    # Process each URL
    local success_count=0
    local failure_count=0
    
    for url in "${urls[@]}"; do
        if download_file "$url" "$verbose"; then
            ((success_count++))
        else
            ((failure_count++))
        fi
        echo # Add spacing between downloads
    done
    
    # Summary
    log "INFO" "Download summary:"
    log "SUCCESS" "  Successful: $success_count"
    if [ $failure_count -gt 0 ]; then
        log "ERROR" "  Failed: $failure_count"
    fi
    
    if [ $failure_count -gt 0 ]; then
        exit 1
    fi
}

# Run main function with all arguments
main "$@"