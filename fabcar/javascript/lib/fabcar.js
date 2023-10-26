/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const snarkjs = require("snarkjs");

const vkeys = {
    "protocol": "plonk",
    "curve": "bn128",
    "nPublic": 2,
    "power": 3,
    "k1": "2",
    "k2": "3",
    "Qm": [
     "19903715171713219647296243278235951579580278506690479302042889303332315926278",
     "17120660378840653177662479442559464538124868546304447105759258729104404280257",
     "1"
    ],
    "Ql": [
     "11404022571904598900846821026653715877319601551544762935614397266926181073611",
     "18435298879736363990372256845964379706404781992434535840522217684264714308648",
     "1"
    ],
    "Qr": [
     "16800242442208028154987384227980975393172417699676753590226390385563439710466",
     "8947184977967002175090799712280277231800258416583251599645578950569171117712",
     "1"
    ],
    "Qo": [
     "19903715171713219647296243278235951579580278506690479302042889303332315926278",
     "4767582492998622044583926302697810550571442610993376556929779165540821928326",
     "1"
    ],
    "Qc": [
     "0",
     "1",
     "0"
    ],
    "S1": [
     "11430701581829481894768025158856152021093909075779720824031639994421043407512",
     "3499208462082992688332407054918530875077046270066893741996769060582419109510",
     "1"
    ],
    "S2": [
     "17086559857859878585422227578611466467593349977456152022978838032335696723671",
     "5638930403723647684269322914111190810105333040831390945973627092223765858828",
     "1"
    ],
    "S3": [
     "260450594503947715233915012202669843606700691405369452433725912696044247122",
     "13713667735615915510509570553235615709081747626039221674855607257959158866167",
     "1"
    ],
    "X_2": [
     [
      "14937000172360418764604550636356090791985744389348941069699380867380898518272",
      "10145921905956537309436003737725061861087692053569580760697746468632698355374"
     ],
     [
      "2372083122461095184861997265329728841023701379640259694758194224315671024632",
      "19006065054628450413230576640803718736524132144604479188436542470237295543818"
     ],
     [
      "1",
      "0"
     ]
    ],
    "w": "19540430494807482326159819597004422086093766032135589407132600596362845576832"
   };

   const proof = {
    "A": [
     "12484694238553758930124256344328198121327931215378764311004338245083313141352",
     "5294632158121329455358151060023604243759727126433097946273767144769129559025",
     "1"
    ],
    "B": [
     "12488115381838650832502450849995660909659119781134259871771859531099806251561",
     "1021063450946979759141173776156412137307940751299253742285684227825314808306",
     "1"
    ],
    "C": [
     "7466781814983040364839993819357730136033982285829380709706476595256151396713",
     "87577176609908320531860449682181845096018675358286314645650218793509281400",
     "1"
    ],
    "Z": [
     "11084657571077678202517899519038769493505631644031644975687338865645306387991",
     "13444078329698469075048536752835661816287427079332184069976009637815050436542",
     "1"
    ],
    "T1": [
     "7232737898713765903172440234542588251997052702179812782423448985927240413021",
     "2388761429774864106143530254119784765130715579592108798872755640258548047957",
     "1"
    ],
    "T2": [
     "13686207913416082343416206343306765420074196145417018755220368024646006394769",
     "11906054537066610627871963645151869909568271160378580802174154612778146743374",
     "1"
    ],
    "T3": [
     "13249251047592829437061012629244319745240214102523627638942681123395962450990",
     "9782408525236114810130445489832531390809214445239221516525891616698363031241",
     "1"
    ],
    "Wxi": [
     "8845828521354833584107987190129572373274383654512858107804449507993252529891",
     "3939157257112010244109757791417012067433701731545273761941327695094910886889",
     "1"
    ],
    "Wxiw": [
     "13389462558936905678958897385946364320253800665342901091072455852682595315452",
     "20167458195768018876094303858538500873464479620875533189607624882267224380378",
     "1"
    ],
    "eval_a": "11651674815376349005743228343732931675130507881895528862845844324690214693683",
    "eval_b": "11759070609172664854828986358740314549387721932553653218164290537536873178456",
    "eval_c": "12688941240618307736917622026157726572143357441661852194320494259715237849683",
    "eval_s1": "20115731015754791909557357186833088780795722358328562777034425083941065488210",
    "eval_s2": "13682545194892856106721851712159398043518287363777518994857009458146929077023",
    "eval_zw": "13575856463373054650241324036520277635868441596257619666198255238418668276298",
    "protocol": "plonk",
    "curve": "bn128"
   };

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner, inputs) {
        console.info('============= START : changeCarOwner ===========');
        const verify = await this.verify(ctx,inputs);
        if(!verify){
            throw new Error(`UNAUTHORIZED`);
        }

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }
    
    async verify(ctx, inputs) {
        console.log("verify");
        console.info("INPUT : ", inputs);
        console.info("vkeys : ", vkeys);
        console.info("proof : ", proof);
        console.info("snarkjs : ", snarkjs);
        const inputsJSON = JSON.parse(inputs);
        const result = await snarkjs.plonk.verify(vkeys, inputsJSON, proof);
        console.info(result);
        return result;
    }


}

module.exports = FabCar;
