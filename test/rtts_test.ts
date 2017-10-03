import {expect} from 'chai';
import {RttsExample} from "./rrts_example";
import CastError = Rtts.CastError;

describe('RTTS Tets', () => {
    it(`tnumber decorator testing`, (done) => {

        //case 1 incorrect argument, should throw TypeError
        let arg1 = 'notNumber';
        try {
            RttsExample.tnumberTest(arg1);
            expect(false, "Error. tnumber decorator is not working.");
        } catch (ex) {
            expect(ex instanceof TypeError, "Error. Unknown error type.");
        }

        //case 2 correct argument, should run decorated function
        let arg2 = 22;
        try {
            let result = RttsExample.tnumberTest(arg2);
            expect(result).to.be.equal(arg2);
        } catch (ex) {
            console.log(ex);
            expect(false);
        }

        done();
    });

    it(`cast('int') decorator testing`, (done) => {

        //case 1 bad argument, should throw CastError
        let arg1 = 'badBadBad';
        try {
            RttsExample.intCastTest(arg1);
            expect(false, "Error. cast('int') decorator is not working.");
        } catch (ex) {
            expect(ex instanceof CastError, "Error. Unknown error type.");
        }

        //case 2 good argument, should return casted value.
        let arg2String = '3444';
        let arg2Int = 3444;
        try {
            let result = RttsExample.intCastTest(arg2String);
            expect(typeof result).to.be.equal("number");
            expect(result).to.be.equal(arg2Int);
        } catch (ex) {
            console.log(ex);
            expect(false);
        }

        done();
    });

    it(`cast('float') decorator testing`, (done) => {

        //case 1 bad argument, should throw CastError
        let arg1 = 'badBadBad';
        try {
            RttsExample.floatCastTest(arg1);
            expect(false, "Error. cast('float') decorator is not working.");
        } catch (ex) {
            expect(ex instanceof CastError, "Error. Unknown error type.");
        }

        //case 2 good argument, should return casted value.
        let arg2String = '34.3';
        let arg2Float = 34.3;
        try {
            let result = RttsExample.floatCastTest(arg2String);
            expect(typeof result).to.be.equal("number");
            expect(result.toString()).to.include('.');
            expect(result).to.be.equal(arg2Float);
        } catch (ex) {
            console.log(ex);
            expect(false);
        }

        done();
    });

});