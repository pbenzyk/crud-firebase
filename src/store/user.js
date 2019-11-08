import axios from 'axios'
import _ from 'lodash'
import { make } from 'vuex-pathify'
import firebase from "firebase";

const state = {
    login: {
        email: '',
        password: ''
    },
    AuthUser: {
        uid: "",
        email: ''
    },
    Token: {
        email: '',
        uid: ''
    },
    profile: {
        address: "",
        age: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
    }


}
const getters = {

}

const mutations = make.mutations(state)

const actions = {

    async login() {
        console.log('email ', state.login.email, ' password ', state.login.password)
        firebase.auth().
            signInWithEmailAndPassword(state.login.email, state.login.password)
            .then(function () {
                location.replace('/#/profile');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                if (errorCode == 'auth/weak-password') {
                    alert('the password is too weak.')
                } else {
                    alert(errorMessage)
                }
                console.log(error)
            });
        await actions.setToken()
        // location.replace('/#/profile');
    },

    async setToken() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                localStorage.removeItem('uid')
                localStorage.removeItem('e-mail')

                localStorage.setItem('uid', user.uid)
                localStorage.setItem('e-mail', user.email);

                state.Token.uid = localStorage.getItem("uid");
                state.Token.email = localStorage.getItem("e-mail");

            } else {
                // User is signed out.
                // ...
            }
        });
    },
    async loguot() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log('logout is success')
            localStorage.clear();
            location.replace('/#/login');
        }).catch(function (error) {
            // An error happened.
        });
    },
    async getProfile() {
        let db = firebase.firestore();
        db.collection("userprofile").doc(localStorage.getItem("e-mail"))
            .onSnapshot(function (doc) {
                state.profile = doc.data()
                // console.log("Current data: ", doc.data());
                // console.log("Profile data: ", state.profile);
            });
        console.log("Profile data: ", state.login.email);
    },
    async updateProfile() {
        let db = firebase.firestore();
        db.collection("userprofile").doc(localStorage.getItem("e-mail")).set(state.profile).then(function () {
            console.log("Document successfully written!");
        });
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}