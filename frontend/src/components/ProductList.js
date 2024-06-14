import React from 'react';
import '../App.css';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const initialState = {
    id: "",
    search: "",
    Product: [],
    recEn: false,
    isRecording: false,
    image_url: "",
    type: "",
    isBlocked: false,
    prevNowPlaying: "",
    video: "",
    videoError: "",
    videoData: "",
    videoRef: null,
    selectedVideo: "",
    voice: "",
    intervalId: "",
    headpose: "",
    iris_pos: "",
    ratio: "",
    blinkCounter: "",
    frameData: "",
    webcamRef: null
}

class ProductList extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    stop = () => {
        Mp3Recorder.stop()
            .getMp3()
            .then(async ([buffer, blob]) => {
                if (blob.size !== 0) {
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
                                    console.log(res.data.result);
                                    this.setState({ recEn: false, voice: res.data.result , search:res.data.result})
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
        const url = "http://localhost:3500/Main/"
        axios.get(url)
            .then(response => this.setState({ Product: response['data'] })
            )
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
        this.setState({ videoData: selectedFile })
        console.log()
    };

    startFun = async () => {
        await this.setState({ recEn: true })
        this.start()
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    render() {
        const { Product } = this.state;
        return (
            <div class="container">
                <br /><br />
                <div class="justify-content-center">
                    <h1>New Collections</h1>
                    <hr />
                    <br />
                    <div class="form-group row">
                    <label class="col-md-2 col-form blue-text">Search</label>

                        <div class="col-md-6">
                            <input type="text" class="form-control" name="search" value={this.state.search} onChange={this.handleChange} />
                        </div>
                        {!this.state.recEn ? (
                            <div class="col-md-4">
                                <input type="submit" class="btn btn-success" value="Start Voice" onClick={this.startFun} />
                            </div>
                        ) : null}
                        {this.state.recEn ? (
                            <div class="col-md-4">
                                <input type="submit" class="btn btn-danger" value="Stop Recorder" onClick={this.stop} />
                            </div>
                        ) : null}
                        <br /><br />
                        <hr />
                    </div>
                    <br />
                    <hr />
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            Product.filter((data) => {
                                if (this.state.search == null)
                                    return data
                                else if (data._id.toLowerCase().includes(this.state.search.toLowerCase()) || data.name.toLowerCase().includes(this.state.search.toLowerCase()) || data.color.toLowerCase().includes(this.state.search.toLowerCase()) || data.size.toLowerCase().includes(this.state.search.toLowerCase())) {
                                    return data
                                }
                            }).map((res) =>
                                <Grid item xs={2} sm={4} md={4} >
                                    <div class="card">
                                        <img class="card-img-top" src={"http://localhost:3500/" + res.image} alt="" />
                                        <div class="card-body">
                                            <h2 class="card-title">{res.name}</h2>
                                            <h3 class="card-title">{'Color : ' + res.color}</h3>
                                            <h3 class="card-text">{'Size : ' + res.size}</h3>
                                            <h3 class="card-text">{'Brand : ' + res.brand}</h3>
                                            <h3 class="card-title">{'Price : Rs. ' + res.salePrice}</h3>
                                            <h3 class="card-title">{'Available Quantity : ' + res.availableAmount}</h3>
                                            <a href={"product_detail/" + res._id} class="btn btn-primary">Select</a>
                                        </div>
                                    </div>
                                </Grid>)
                        }
                    </Grid>
                    <br />
                </div>
            </div>
        );
    }
}

export default ProductList;
