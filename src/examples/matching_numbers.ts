import {
  Address,
  Blockfrost,
  Data,
  Lovelace,
  Lucid,
  SpendingValidator,
  TxHash,
} from "../../mod.ts";

/*
MatchingNumbers Example
Lock a UTxO with a number and some ADA
UTxO can be unlocked when the same number is provided in the redeemer

Contract:

validate :: Integer -> Integer -> ScriptContext -> Bool
validate a b _ = a == b
 */

const lucid = await Lucid.new(
  new Blockfrost("https://cardano-testnet.blockfrost.io/api/v0", "<projectId>"),
  "Testnet",
);

const api = await window.cardano.nami.enable();
// Assumes you are in a browser environment
lucid.selectWallet(api);

const matchingNumberScript: SpendingValidator = {
  type: "PlutusV1",
  script:
    "59099a59099701000033233223322323233322232333222323333333322222222323332223233332222323233223233322232333222323233223322323233333222223322332233223322332233222222323253353031333006375a00a6eb4010cccd5cd19b8735573aa004900011980499191919191919191919191999ab9a3370e6aae754029200023333333333017335025232323333573466e1cd55cea8012400046603a60706ae854008c0a8d5d09aba250022350573530583357389201035054310005949926135573ca00226ea8004d5d0a80519a8128131aba150093335502c75ca0566ae854020ccd540b1d728159aba1500733502504135742a00c66a04a66aa0a4094eb4d5d0a8029919191999ab9a3370e6aae7540092000233501f3232323333573466e1cd55cea80124000466a04e66a080eb4d5d0a80118229aba135744a00446a0b66a60b866ae712401035054310005d49926135573ca00226ea8004d5d0a8011919191999ab9a3370e6aae7540092000233502533504075a6ae854008c114d5d09aba2500223505b35305c3357389201035054310005d49926135573ca00226ea8004d5d09aba250022350573530583357389201035054310005949926135573ca00226ea8004d5d0a80219a812bae35742a00666a04a66aa0a4eb88004d5d0a801181b9aba135744a00446a0a66a60a866ae71241035054310005549926135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135573ca00226ea8004d5d0a8011919191999ab9a3370ea00290031180e181c9aba135573ca00646666ae68cdc3a801240084603660866ae84d55cf280211999ab9a3370ea00690011180d98171aba135573ca00a46666ae68cdc3a802240004603c6eb8d5d09aab9e500623504e35304f3357389201035054310005049926499264984d55cea80089baa001357426ae8940088d411cd4c120cd5ce2490350543100049499261048135046353047335738920103505435000484984d55cf280089baa0012212330010030022001222222222212333333333300100b00a00900800700600500400300220012212330010030022001122123300100300212001122123300100300212001122123300100300212001212222300400521222230030052122223002005212222300100520011232230023758002640026aa068446666aae7c004940388cd4034c010d5d080118019aba200203323232323333573466e1cd55cea801a4000466600e6464646666ae68cdc39aab9d5002480008cc034c0c4d5d0a80119a8098169aba135744a00446a06c6a606e66ae712401035054310003849926135573ca00226ea8004d5d0a801999aa805bae500a35742a00466a01eeb8d5d09aba25002235032353033335738921035054310003449926135744a00226aae7940044dd50009110919980080200180110009109198008018011000899aa800bae75a224464460046eac004c8004d540b888c8cccd55cf80112804919a80419aa81898031aab9d5002300535573ca00460086ae8800c0b84d5d08008891001091091198008020018900089119191999ab9a3370ea002900011a80418029aba135573ca00646666ae68cdc3a801240044a01046a0526a605466ae712401035054310002b499264984d55cea80089baa001121223002003112200112001232323333573466e1cd55cea8012400046600c600e6ae854008dd69aba135744a00446a0466a604866ae71241035054310002549926135573ca00226ea80048848cc00400c00880048c8cccd5cd19b8735573aa002900011bae357426aae7940088d407cd4c080cd5ce24810350543100021499261375400224464646666ae68cdc3a800a40084a00e46666ae68cdc3a8012400446a014600c6ae84d55cf280211999ab9a3370ea00690001280511a8111a981199ab9c490103505431000244992649926135573aa00226ea8004484888c00c0104488800844888004480048c8cccd5cd19b8750014800880188cccd5cd19b8750024800080188d4068d4c06ccd5ce249035054310001c499264984d55ce9baa0011220021220012001232323232323333573466e1d4005200c200b23333573466e1d4009200a200d23333573466e1d400d200823300b375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c46601a6eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc048c050d5d0a8049bae357426ae8940248cccd5cd19b875006480088c050c054d5d09aab9e500b23333573466e1d401d2000230133016357426aae7940308d407cd4c080cd5ce2481035054310002149926499264992649926135573aa00826aae79400c4d55cf280109aab9e500113754002424444444600e01044244444446600c012010424444444600a010244444440082444444400644244444446600401201044244444446600201201040024646464646666ae68cdc3a800a400446660106eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d400920002300a300b357426aae7940188d4040d4c044cd5ce2490350543100012499264984d55cea80189aba25001135573ca00226ea80048488c00800c888488ccc00401401000c80048c8c8cccd5cd19b875001480088c018dd71aba135573ca00646666ae68cdc3a80124000460106eb8d5d09aab9e500423500a35300b3357389201035054310000c499264984d55cea80089baa001212230020032122300100320011122232323333573466e1cd55cea80124000466aa016600c6ae854008c014d5d09aba25002235007353008335738921035054310000949926135573ca00226ea8004498480048004448848cc00400c008448004448c8c00400488cc00cc008008004ccc888ccc888cccccccc88888888cc88ccccc88888cccc8888ccc888cc88cc88cc88ccc888cc88cc88ccc888cc88cc88cc88cc88888ccd5cd19b8700300201e01d2212330010030022001222222222212333333333300100b00a00900800700600500400300220012212330010030022001222123330010040030022001112200212212233001004003120011122123300100300211200122123300100300220011212230020031122001120011221233001003002120011221233001003002120011221233001003002120011220021220012001121222300300411222002112220011200121222230040052122223003005212222300200521222230010052001221233001003002200121222222230070082212222222330060090082122222223005008122222220041222222200322122222223300200900822122222223300100900820012122300200322212233300100500400320012122300200321223001003200101",
};

const matchingNumberAddress: Address = lucid.utils.validatorToAddress(
  matchingNumberScript,
);

const Datum = (number: number) => Data.to(BigInt(number));
const Redeemer = (number: number) => Data.to(BigInt(number));

export async function lockUtxo(
  number: number,
  lovelace: Lovelace,
): Promise<TxHash> {
  const tx = await lucid
    .newTx()
    .payToContract(matchingNumberAddress, Datum(number), { lovelace })
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}

export async function redeemUtxo(number: number): Promise<TxHash> {
  const utxo = (await lucid.utxosAt(matchingNumberAddress)).slice(-1)[0];

  const tx = await lucid
    .newTx()
    .collectFrom([utxo], Redeemer(number))
    .attachSpendingValidator(matchingNumberScript)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}
