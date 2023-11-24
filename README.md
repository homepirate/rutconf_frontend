# rutconf_frontend
 #### Run OpenVidu deployment 
 docker run -p 4443:4443 --rm -e OPENVIDU_SECRET=MY_SECRET openvidu/openvidu-dev:2.29.0

 ###  Run your preferred server application sample
 git clone https://github.com/OpenVidu/openvidu-tutorials.git -b v2.29.0


## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
