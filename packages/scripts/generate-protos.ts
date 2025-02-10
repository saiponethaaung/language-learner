import { execSync } from "child_process";
import * as fs from "fs";
import path from "path";

class GenerateProtos {
  async generate() {
    const apiFolderPath = path.resolve(__dirname, "../../apps/api");
    const frontendFolderPath = path.resolve(
      __dirname,
      "../../apps/frontend/src/grpc/gen"
    );
    const adminFolderPath = path.resolve(
      __dirname,
      "../../apps/admin/src/grpc/gen"
    );
    const protoPath = path.resolve(__dirname, "../protos");
    const files = fs.readdirSync(protoPath);
    const binPath = path.resolve(__dirname, "./node_modules/.bin");

    for (const file of files) {
      const ext = file.split(".")[1];
      if (ext !== "proto") continue;
      const name = file.split(".")[0];

      const folderPath = path.resolve(apiFolderPath, name);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      execSync(
        `cd ../../ && protoc --go_out=plugins=grpc:${folderPath} --go_opt=paths=source_relative --proto_path=${protoPath} ${file}`
      );

      // protoc \
      // --plugin=protoc-gen-ts=$(which protoc-gen-ts) \
      // --ts_out=grpc_js:. \
      // --grpc_out=grpc_js:. \
      // --js_out=import_style=commonjs,binary:. \
      // service.proto
      if (["admin.proto", "common.proto"].includes(file)) {
        // execSync(
        //   `cd ../../ && protoc --plugin=protoc-gen-ts="${protocGenTs}" --plugin=protoc-gen-grpc="${protocGenGRPC}" --ts_out=grpc_js:${frontendFolderPath}/ --grpc_out=grpc_js:${frontendFolderPath}/ --js_out=import_style=commonjs,binary:${frontendFolderPath}/ --proto_path=${protoPath} ${file}`
        // );
        // commands = `${commands} && protoc`;
        // commands = `${commands} --js_out=import_style=commonjs,binary:${frontendFolderPath}/`;
        // commands = `${commands} --grpc_out=${frontendFolderPath}/`;
        // commands = `${commands} --plugin=protoc-gen-grpc=${binPath}/grpc_tools_node_protoc_plugin --proto_path=${protoPath} ${file}`;
        let commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-ts=${binPath}/protoc-gen-ts`;
        commands = `${commands} --ts_out=${adminFolderPath}/ --proto_path=${protoPath} ${file}`;
        execSync(commands);
      }
      if (["user.proto", "common.proto"].includes(file)) {
        // execSync(
        //   `cd ../../ && protoc --plugin=protoc-gen-ts="${protocGenTs}" --plugin=protoc-gen-grpc="${protocGenGRPC}" --ts_out=grpc_js:${frontendFolderPath}/ --grpc_out=grpc_js:${frontendFolderPath}/ --js_out=import_style=commonjs,binary:${frontendFolderPath}/ --proto_path=${protoPath} ${file}`
        // );
        // commands = `${commands} && protoc`;
        // commands = `${commands} --js_out=import_style=commonjs,binary:${frontendFolderPath}/`;
        // commands = `${commands} --grpc_out=${frontendFolderPath}/`;
        // commands = `${commands} --plugin=protoc-gen-grpc=${binPath}/grpc_tools_node_protoc_plugin --proto_path=${protoPath} ${file}`;
        let commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-ts=${binPath}/protoc-gen-ts`;
        commands = `${commands} --ts_out=${frontendFolderPath}/ --proto_path=${protoPath} ${file}`;
        execSync(commands);
      }
    }
  }
}

const generate = new GenerateProtos();
generate.generate();
