export const readFileAsync = (file: File) => {
    // Create a new instance of the `FileReader` API, which is used to asynchronously read file contents.
    const fileReader = new FileReader()

    // a `Promise` is a class (or constructor) that represents a value that may become available in the future.
    // the `Promise` constructor, takes a callback function with two arguments: resolve and reject.
    // the `resolve` function will be called on successful reading of the file.
    // and `reject` will be called if an error occurs.
    return new Promise((resolve: (value: number[]) => void, reject) => {
        // Attach an event handler for the `error` event of the `FileReader`.
        // This is triggered if something goes wrong during the file reading process, and the fileReader will be aborted, and rejected.
        fileReader.onerror = () => {
        fileReader.abort()
        reject(new Error("Problem parsing input file."))
      }

      // Attach an event handler for the `load` event of the `FileReader`.
      // This is triggered when the file is successfully read.
      fileReader.onload = () => {
        const result = Array.from(
            // Convert the ArrayBuffer into a typed array (`Uint8Array`) to work with the file data as bytes.
            // Use `Array.from` to transform the typed array into a regular array of numbers.
            new Uint8Array(fileReader.result as ArrayBuffer)
        )
        resolve(result)
      }
      // Start reading the file as an ArrayBuffer, which represents the raw binary data of the file.
      fileReader.readAsArrayBuffer(file)
    })
  }