import axios from 'axios';
import readline from 'readline';

const URL = 'http://127.0.0.1:8080';

const main = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Kusama address: ', (input_address) => {
        rl.question('Depth ', async (input_depth) => {
            await api(input_address, input_depth);
        });
    });

    return
}

const api = async (adr, depth) => {


    const { data } = await axios.get(`${URL}/accounts/${adr}/staking-payouts?depth=${depth}&unclaimedOnly=true`);

    const total = data
        .erasPayouts
        .reduce((acc: number, { payouts }) => (
            acc + payouts
                .reduce((pAcc: number, { claimed, nominatorStakingPayouts }) => (claimed ? pAcc : pAcc + Number.parseInt(nominatorStakingPayouts)), 0)), 0)

    console.log('TOTAL PENDING PAYOUTS: ', total);

};

main();