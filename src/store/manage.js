import axios from 'axios'
import _ from 'lodash'
import { make } from 'vuex-pathify'
import firebase from "firebase";
import store from './'
const state = {
    dialogUser: false,
    dialogEditUser: false,
    readEmail: "",
    formUser: {
        email: '',
        password: ''
    },
    formProfile: {
        address: "",
        age: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
    },
    formUpdateProfile: {
        address: "",
        age: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
    },
    userCard: [{
        address: "",
        age: "",
        email: "",
        firstname: "",
        lastname: "",
        phone: ""
    }]
}
const getters = {

}

const mutations = make.mutations(state)

const actions = {
    async addUser() {
        // await store.dispatch('loading/loadingOn');
        firebase.auth().
            createUserWithEmailAndPassword(state.formUser.email, state.formUser.password)
            .then((user) => {
                console.log('create and signOut')
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                    // localStorage.clear();
                    console.log('logout is success', window.localStorage)
                }).catch(function (error) {
                    // An error happened.
                });
            })
            .catch(function (error) {
                console.log(error)
            });
        actions.addData();
        location.replace('/#/profile');
        // await store.dispatch('loading/loadingOff');
    },
    async addData() {
        // await store.dispatch('loading/loadingOn');
        var db = firebase.firestore();
        db.collection("userprofile").doc(state.formUser.email).set({
            email: state.formUser.email,
            address: state.formProfile.address,
            age: state.formProfile.age,
            firstname: state.formProfile.firstname,
            lastname: state.formProfile.lastname,
            phone: state.formProfile.phone
        })
            .then(function () {
                console.log("Document successfully written!");
                state.formUser = {}
                state.dialogUser = false
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
        // await store.dispatch('loading/loadingOff');
    },
    async readData() {
        // await store.dispatch('loading/loadingOn');
        state.userCard = []
        var db = firebase.firestore();
        db.collection("userprofile").get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    state.userCard.push(doc.data())
                    // console.log(doc.id, " => ", doc.data());
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        console.log('userCard =>', state.userCard);
        // await store.dispatch('loading/loadingOff');
    },
    async getProfileUpdate() {
        // await store.dispatch('loading/loadingOn');
        console.log("getProfileUpdate", state.readEmail)
        let db = firebase.firestore();
        db.collection("userprofile").doc(state.readEmail)
            .onSnapshot(function (doc) {
                state.formUpdateProfile = doc.data()
                console.log("Current data: ", doc.data());
                // console.log("Profile data: ", state.profile);
            });
        console.log("Profile data readEmail: ", state.formUpdateProfile);
        // await store.dispatch('loading/loadingOff');
    },
    async updateProfileUpdate() {
        // await store.dispatch('loading/loadingOn');
        let db = firebase.firestore();
        let washingtonRef = db.collection("userprofile").doc(state.readEmail);

        // Set the "capital" field of the city 'DC'
        washingtonRef.update({
            address: state.formUpdateProfile.address,
            age: state.formUpdateProfile.age,
            firstname: state.formUpdateProfile.firstname,
            lastname: state.formUpdateProfile.lastname,
            phone: state.formUpdateProfile.phone
        })
            .then(function () {
                state.dialogEditUser = false
                actions.readData()
                console.log("Document successfully updated!");
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        // await store.dispatch('loading/loadingOff');
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}