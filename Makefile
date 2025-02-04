info:
	@echo "Build script"
	@echo "make proto (to generate proto for api)"

proto:
	cd packages/scripts && ts-node generate-protos.ts