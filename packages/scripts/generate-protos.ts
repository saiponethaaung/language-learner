import { execSync } from "child_process";
import * as fs from "fs";
import path from "path";

class GenerateProtos {
  async generate() {
    const apiFolderPath = path.resolve(__dirname, "../../apps/api");
    const frontendFolderPath = path.resolve(
      __dirname,
      "../../apps/frontend/src/utils/grpc/gen"
    );
    const adminFolderPath = path.resolve(
      __dirname,
      "../../apps/admin/src/utils/grpc/gen"
    );
    const adminTypeFolderPath = path.resolve(
      __dirname,
      "../../apps/admin/src/utils/grpc/type"
    );
    const mobileFolderPath = path.resolve(
      __dirname,
      "../../apps/mobile/utils/grpc/gen"
    );
    const mobileTypeFolderPath = path.resolve(
      __dirname,
      "../../apps/mobile/utils/grpc/type"
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
        `cd ../../ && protoc --go_out=${folderPath} --go_opt=paths=source_relative --go-grpc_out=${folderPath} --go-grpc_opt=paths=source_relative --proto_path=${protoPath} ${file}`
      );

      if (
        [
          "admin.proto",
          "common.proto",
          "language.proto",
          "course.proto",
          "section.proto",
        ].includes(file)
      ) {
        // generate proto handler
        let commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-ts=${binPath}/protoc-gen-ts`;
        commands = `${commands} --ts_out=${adminFolderPath}/ --proto_path=${protoPath} ${file}`;
        execSync(commands);
        // generate types from proto
        commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-ts_proto=${binPath}/protoc-gen-ts_proto`;
        commands = `${commands} --ts_proto_opt=esModuleInterop=true,outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false`;
        commands = `${commands} --ts_proto_out=${adminTypeFolderPath}/ --proto_path=${protoPath} ${file}`;
        execSync(commands);
      }

      if (
        [
          "user.proto",
          "common.proto",
          "language.proto",
          "course.proto",
          "section.proto",
        ].includes(file)
      ) {
        let commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-ts=${binPath}/protoc-gen-ts`;
        commands = `${commands} --ts_out=${frontendFolderPath}/ --proto_path=${protoPath} ${file}`;
        execSync(commands);
      }

      if (
        [
          "user.proto",
          "common.proto",
          "language.proto",
          "course.proto",
          "section.proto",
        ].includes(file)
      ) {
        // generate proto handler
        let commands = "cd ../../";
        commands = `${commands} && protoc`;
        commands = `${commands} --plugin=protoc-gen-js=${binPath}/protoc-gen-js`;
        commands = `${commands} --plugin=protoc-gen-grpc-web=${binPath}/protoc-gen-grpc-web`;
        commands = `${commands} --plugin=protoc-gen-ts=${binPath}/protoc-gen-ts`;
        commands = `${commands} --ts_out=service=grpc-web:${mobileFolderPath}`;
        commands = `${commands} --js_out=import_style=commonjs:${mobileFolderPath}/`;
        commands = `${commands} --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:${mobileFolderPath}/`;
        commands = `${commands} --proto_path=${protoPath} ${file}`;
        execSync(commands);
        // // generate types from proto
        // commands = "cd ../../";
        // commands = `${commands} && protoc`;
        // commands = `${commands} --plugin=protoc-gen-ts_proto=${binPath}/protoc-gen-ts_proto`;
        // commands = `${commands} --ts_proto_opt=esModuleInterop=true,outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false`;
        // commands = `${commands} --ts_proto_out=${mobileTypeFolderPath}/ --proto_path=${protoPath} ${file}`;
        // execSync(commands);
      }
    }
  }
}

const generate = new GenerateProtos();
generate.generate();
