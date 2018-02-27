let AWS = require('aws-sdk');
const s3 = new AWS.S3();
exports.handler = function (event, context, callback) {


	let encodedImage = JSON.parse(event.body).user_avatar;
	let decodedImage = Buffer.from(encodedImage, 'base64');

	var filePath = "avatars/" + event.pathParameters.username + ".jpg"

	s3.putObject({
		"Body": encodedImage,
		"Bucket": "upload-to-s3-sample",
		"Key": filePath
	})
		.promise()
		.then(data => {
			console.log(data);           // successful response
			let response = {
				"statusCode": 200,
				"headers": {
					"my_header": "my_value"
				},
				"body": JSON.stringify(data),
				"isBase64Encoded": false
			};
			callback(null, response);
		})
		.catch(err => {
			console.log(err, err.stack); // an error occurred'
			callback(err, null);
		});

}