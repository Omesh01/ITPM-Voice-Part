import React from 'react';
import '../App.css';
import Webcam from "react-webcam";
import axios from "axios";
import swal from 'sweetalert';
import html2canvas from 'html2canvas';
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const initialState = {
    recEn:false,
    isRecording: false,
    image_url: "",
    type: "",
    isBlocked: false,
    prevNowPlaying: "",
    video: "",
    videoError: "",
    videoData:"",
    videoRef:null,
    selectedVideo:"",
    voice: "",
    intervalId: "",
    headpose: "",
    iris_pos: "",
    ratio: "",
    blinkCounter: "",
    frameData:"",
    webcamRef: null
}

class Main extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    
    stop = () => {
        Mp3Recorder.stop()
        .getMp3()
        .then(async ([buffer, blob]) => {
        if (blob.size != 0) {
            console.log(blob);
            const blobURL = URL.createObjectURL(blob);
            const audioBlob = await fetch(blobURL).then((r) => r.blob());
            const audioFile = new File([audioBlob], "voice.mp3", {
            type: "audio/mp3",
            });
            const data = new FormData();
            data.append("file", audioFile);
            axios
            .post("http://localhost:3500/Main", data)
            .then(async (res) => {
                console.log(res);
                const data_url = await res.data.filename;
                const url = "http://localhost:5555/voice";
                const data = JSON.stringify({ url: data_url, word: "bat" });
                console.log(data);
                await axios
                .post(url, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then(async (res) => {
                    console.log(res.data);
                    this.setState({recEn:false,voice:res.data.result})
                });
            });
        }
        })
        .catch((e) => console.log(e));
    };

    componentDidMount() {
        navigator.getUserMedia(
            { audio: true },
            () => {
            console.log("Permission Granted");
            this.setState({ isBlocked: false });
            },
            () => {
            console.log("Permission Denied");
            this.setState({ isBlocked: true });
            }
        );
    }

    start = () => {
        console.log("start");
        Mp3Recorder.start()
        .then(() => {
        this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    };

    handleFileChange = (event) => {
        const selectedFile = URL.createObjectURL(event.target.files[0]);
        console.log(selectedFile)
        this.setState({videoData:selectedFile})
        console.log()
    };

    startFun =async()=>{
        await this.setState({recEn:true})
        this.start()
    }
    
    render (){
        return (
            <div class="container">
            <div className="col-lg-12">
            <br/><br/>
            <div class="justify-content-center">
                    <h1>Recorder Your Voice</h1>
                    <div class="x_scroll">
                        <br/>
            {!this.state.recEn ? (
                        <div class="col-md-4 offset-md-4">
                            <input type="submit" class="btn btn-success box_class" value="Start" onClick={this.startFun} />
                        </div>
            ) : null}
            {this.state.recEn ? (
                <div class="col-md-4 offset-md-4">
                    <input type="submit" class="btn btn-danger box_class" value="Stop" onClick={this.stop} />
                </div>
            ) : null}
                    <hr/>
                        <div class="form-group row">
                            <label class="col-md-4 col-form-label text-md-right font-weight-bold">Prediction</label>
                            <div class="col-md-6">
                                <div style={{color : "red"}}>{this.state.voice}</div>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Main;