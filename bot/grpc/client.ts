var PROTO_PATH = __dirname + '/../../../ml/proto/ml.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
var routeguide = protoDescriptor.ml;
var stub = new routeguide.ML('ml:50051', grpc.credentials.createInsecure());

var point = {latitude: 409146138, longitude: -746188906};
stub.SayHello({name: 'lol'}, function(err: any, feature: any) {
  if (err) {
    // process error
    console.log(err)
  } else {
    // process feature
    console.log(feature)
  }
});