I have a node js project with this file structure:

```yml
tree:
  directory:
    - directory:
        - file:
            - _name: decode-file.spec.ts
            - _name: decode-text.spec.ts
            - _name: decrypt-text.spec.ts
            - _name: encode-file.spec.ts
            - _name: encode-text.spec.ts
            - _name: encrypt-text.spec.ts
          _name: services
        - file:
            - _name: common.spec.ts
            - _name: number-extensions.spec.ts
            - _name: read-file-async.spec.ts
            - _name: string-converters.spec.ts
          _name: utils
      _name: __tests__
    - directory:
        - file:
            _name: trezor-connect.d.ts
          _name: declarations
        - file:
            _name: CrypteeFile.ts
          _name: models
        - file:
            - _name: decode-file.ts
            - _name: decode-text.ts
            - _name: decrypt-file.ts
            - _name: decrypt-text.ts
            - _name: encode-file.ts
            - _name: encode-text.ts
            - _name: encrypt-file.ts
            - _name: encrypt-text.ts
          _name: services
        - file:
            - _name: common.ts
            - _name: number-converters.ts
            - _name: read-file-async.ts
            - _name: string-converters.ts
          _name: utils
      file:
        - _name: constants.ts
        - _name: index.ts
      _name: src
    - file:
        _name: build.js
      _name: tools
  file:
    - _name: LICENSE
    - _name: Makefile
    - _name: README.md
    - _name: jest.config.js
    - _name: package.json
    - _name: tsconfig.json
    - _name: tsconfig.npm.json
    - _name: tsconfig.prod.json
    - _name: webpack.config.js
    - _name: webpack.config.npm.js
    - _name: yarn.lock
  _name: cryptee-core
```

I want to you to help me:

- understand the project structure
- understand the project dependencies
- understand the project entry point
