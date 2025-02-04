import { execSync } from "child_process";
import * as fs from "fs";
import path from "path";

class GenerateProtos {
  async generate() {
    const apiFolderPath = path.resolve(__dirname, "../../apps/api");
    const protoPath = path.resolve(__dirname, "../protos");
    const files = fs.readdirSync(protoPath);

    for (const file of files) {
      const name = file.split(".")[0];

      const folderPath = path.resolve(apiFolderPath, name);
      
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      execSync(
        `cd ../../ && protoc --go_out=plugins=grpc:${folderPath} --go_opt=paths=source_relative --proto_path=${protoPath} ${file}`
      );
    }
  }
}

const generate = new GenerateProtos();
generate.generate();
