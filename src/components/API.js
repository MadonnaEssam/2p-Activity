// import Vue from "vue";
import axios from "axios";

const PAjax = {

    install(Vue) {
        Vue.__BaseServiceRootURL = "https://private-30dec-getactivitylist.apiary-mock.com/activity/1";
        var header = {
            "Content-Type": "application/json",
            authorization: "Bearer " + (window.localStorage.token && window.localStorage.token != '' ? window.localStorage.token : window.localStorage.tokenClosed),
        }
        Vue.Invoke = (apiMethod, obj, callBackfn) => {
            try {
                if (apiMethod == "get") {
                    axios.get(Vue.__BaseServiceRootURL, {
                            headers: header,
                        }).then((response) => {
                            if (callBackfn) {

                                callBackfn(
                                    response != null ?
                                    response.data :
                                    window.alert("response is null")
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else if (apiMethod == "post") {
                    axios.post(Vue.__BaseServiceRootURL, obj, {
                            headers: header,
                        }).then((response) => {
                            if (callBackfn) {

                                callBackfn(
                                    response != null ?
                                    response.data :
                                    window.alert("response is null")
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else if (apiMethod == "put") {
                    axios.put(Vue.__BaseServiceRootURL, obj, {
                            headers: header,
                        }).then((response) => {
                            if (callBackfn) {

                                callBackfn(
                                    response != null ?
                                    response.data :
                                    window.alert("response is null")
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                } else if (apiMethod == "delete") {
                    axios.delete(Vue.__BaseServiceRootURL, {
                            headers: header,
                            data: {
                                id: obj
                            }
                        }).then((response) => {
                            if (callBackfn) {

                                callBackfn(
                                    response != null ?
                                    response.data :
                                    window.alert("response is null")
                                );
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }

            } catch (error) {

                if (callBackfn) {
                    callBackfn(null);
                }
            }
        }
    }

}
export default PAjax;