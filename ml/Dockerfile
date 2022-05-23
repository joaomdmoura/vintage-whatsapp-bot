FROM python:bullseye

ENV LANG C.UTF-8
RUN apt-get upgrade -y
RUN apt-get update -y
RUN apt-get install gfortran libopenblas-dev liblapack-dev pkg-config -y
RUN pip3 install --upgrade pip setuptools wheel
RUN apt-get install python3-dev -y
RUN mkdir /app
WORKDIR /app

RUN pip3 install --upgrade pip
COPY requirements.txt .
RUN pip3 install -r requirements.txt

COPY . .
RUN python -m grpc_tools.protoc -I./ --python_out=./ --grpc_python_out=./ proto/ml.proto

CMD [ "python3", "server.py" ]
