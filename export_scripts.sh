#!/usr/bin/env bash


export_to_unified_markdown() {
    local output_file="all_files.md"

    # Directories to skip (by name)
    SKIP_DIRS=(
        ".git"
        "node_modules"
    )

    # Files to skip (by name or pattern)
    SKIP_FILES=(
        "debug.log"
        "secret.env"
    )

    # Clear or create the output file
    : > "$output_file"

    # Build prune expressions for directories and files
    # Each skipped directory or file is pruned before we gather the rest
    local prune_args=()

    # Skip directories
    for d in "${SKIP_DIRS[@]}"; do
        # Convert "dir" -> "./dir" for direct matching at any level
        prune_args+=( -path "./$d" -prune -o )
    done

    # Skip files
    for f in "${SKIP_FILES[@]}"; do
        prune_args+=( -name "$f" -prune -o )
    done

    # At the end, gather actual files (the ones not pruned)
    prune_args+=( -type f -print0 )

    # Run find with our dynamic prune expression
    find . "${prune_args[@]}" | while IFS= read -r -d '' file; do

        # Extract file extension (if any)
        local ext=""
        if [[ "$file" == *.* ]]; then
            ext="${file##*.}"
        fi

        # Append to our unified Markdown file
        {
            echo "Path: $file"
            if [[ -n "$ext" ]]; then
                echo "```$ext"
            else
                echo "```"
            fi
            cat "$file"
            echo "```"
            echo
        } >> "$output_file"
    done

    echo "All files have been combined into '$output_file', skipping specified dirs/files."
}

# Usage:
# 1. Adjust SKIP_DIRS and SKIP_FILES above as needed.
# 2. Run the function in the directory you want to process.

export_to_unified_markdown
