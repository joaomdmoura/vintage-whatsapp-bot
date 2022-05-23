from concurrent import futures
import logging

import grpc
import proto.ml_pb2
import proto.ml_pb2_grpc

class ML(proto.ml_pb2_grpc.MLServicer):
  def SayHello(self, request, context):
    return proto.ml_pb2.HelloReply(message='Hello, %s!' % request.name)


def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  proto.ml_pb2_grpc.add_MLServicer_to_server(ML(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
  logging.basicConfig()
  serve()