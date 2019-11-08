import axios from 'axios'
import _ from 'lodash'
import { make } from 'vuex-pathify'
import firebase from "firebase";
const state = {
    dialogUser: false,
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
        firebase.auth().
            createUserWithEmailAndPassword(state.formUser.email, state.formUser.password)
            .then((user) => {
                console.log('create and signOut')
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                    localStorage.clear();
                    console.log('logout is success', window.localStorage)
                }).catch(function (error) {
                    // An error happened.
                });
            })
            .catch(function (error) {
                console.log(error)
            });
        actions.addData();
    },
    async addData() {
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
                state.dialogUser = false
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    },
    async readData() {
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
    }

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}