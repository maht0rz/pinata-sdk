bash:
	docker run -v $(PWD):$(PWD) -w $(PWD) -it pinata-sdk /bin/bash

build-image:
	docker build . -t pinata-sdk