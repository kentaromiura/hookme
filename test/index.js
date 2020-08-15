const hookme = require('hookme');
const $ = require('augmentor');
const {augmentor} = $;

const state = {};
hookme.useHooksFrom($);
const {useSelector, useMorph} = hookme;

const testRead = augmentor(function (){
    const value = useSelector(state, s => s.test);
    return value;
});

const testWrite = augmentor(function() {
    const [_, morph] = useMorph(state);
    morph(value => {
        value.test = "Ciao";
    })
});

testWrite();
console.log(testRead());
