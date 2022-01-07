const CommandoClient = require('./client');
const Discord = require('discord.js');
const bbq = require('./bbq.json');
const bbrun = require('./bbrun.json');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env'));


const client = new CommandoClient({
    owner: process.env.BOT_OWNER_ID,
    disableMentions: 'everyone'
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['divers', 'Divers'],
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'))
    ;

for (const k in envConfig) {
    process.env[k] = envConfig[k]
}

function Savebbq() {
    fs.writeFile("./bbq.json", JSON.stringify(bbq, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}

function Savebbrun() {
    fs.writeFile("./bbrun.json", JSON.stringify(bbrun, null, 4), (err) => {
        if (err) message.channel.send("Une erreur est survenue.");
    });
}

function Countrs(a, b) {
    if (bbrun[a][b] === undefined) { return "<@" + b + "> [1er rs]" }
    else if (bbrun[a][b] >= 999) { return "<@" + b + "> [1000+ rs]" }
    else if (bbrun[a][b] >= 499) { return "<@" + b + "> [500+ rs]" }
    else if (bbrun[a][b] >= 99) { return "<@" + b + "> [100+ rs]" }
    else if (bbrun[a][b] >= 49) { return "<@" + b + "> [50+ rs]" }
    else if (bbrun[a][b] >= 19) { return "<@" + b + "> [20+ rs]" }
    else if (bbrun[a][b] >= 10) { return "<@" + b + "> [10+ rs]" }
    else if (bbrun[a][b] >= 4) { return "<@" + b + "> [5+ rs]" }
    else if (bbrun[a][b] === 3) { return "<@" + b + "> [4ème rs]" }
    else if (bbrun[a][b] === 2) { return "<@" + b + "> [3ème rs]" }
    else if (bbrun[a][b] === 1) { return "<@" + b + "> [2ème rs]" }

}

function Rspost(message, x, a, b, c1, d1, e1, f1, c2, d2, e2, f2, c3, d3, e3, f3) {
    var daten = new Date();
    var hrs = new Date(daten.getTime() + 8100000);
    if (bbq["RsTimefinish" + b] === undefined) { bbq["RsTimefinish" + b] = ("0" + hrs.getHours()).slice(-2) + ':' + ("0" + hrs.getMinutes()).slice(-2); }
    var hrs1 = bbq["RsTimefinish" + b];
    if (bbq["RsTime" + b] === undefined) { bbq["RsTime" + b] = "1"; }
    const embed = new Discord.MessageEmbed(); // création de l'embed
    embed
        .setColor(`BLUE`) // ou .setColor(`#0099ff`)        

        .setDescription(`
        **Rs${b} en préparation !**  *expire à : ${hrs1}*

Joueur 1 : ${c2}
Joueur 2 : ${d2}
Joueur 3 : ${e2}
Joueur 4 : ${f2}

`)
        ;

    message.channel.send(embed)
//    if (c1 == ("302791189504196608") || d1 == ("302791189504196608") || e1 == ("302791189504196608") || f1 == ("302791189504196608")) { message.channel.send(`Attention aux inters  <@302791189504196608> !!!!`) }
    if (a == ("4")) {
        message.channel.send(`Rs Full!`)
        message.channel.send(`${c3} , ${d3} , ${e3} , ${f3} , Préparez-vous au combat !
Force et honneur !`)
        var list = client.guilds.cache.get(message.guild.id)
        if (list.member(c1)) {
            if (bbrun[b][c1] !== undefined) {
                let new_level = Number(bbrun[b][c1]) + 1;
                bbrun[b][c1] = new_level;
            }
            else { bbrun[b][c1] = 1 }
        }
        if (list.member(d1)) {
            if (bbrun[b][d1] !== undefined) {
                let new_level = Number(bbrun[b][d1]) + 1;
                bbrun[b][d1] = new_level;
            }
            else { bbrun[b][d1] = 1 }
        }
        if (list.member(e1)) {
            if (bbrun[b][e1] !== undefined) {
                let new_level = Number(bbrun[b][e1]) + 1;
                bbrun[b][e1] = new_level;
            }
            else { bbrun[b][e1] = 1 }
        }
        if (list.member(f1)) {
            if (bbrun[b][f1] !== undefined) {
                let new_level = Number(bbrun[b][f1]) + 1;
                bbrun[b][f1] = new_level;
            }
            else { bbrun[b][f1] = 1 }
        }
        Savebbrun()
        delete bbq["RsTimefinish" + b]; delete bbq["RsTime" + b]; delete bbq["Rs" + b + "joueur1"]; delete bbq["Rs" + b + "joueur2"]; delete bbq["Rs" + b + "joueur3"]; delete bbq["Rs" + b + "joueur4"]
        clearTimeout(x)
    }
    Savebbq()

}

function RsStart(message, x, a, b) {
    var joueur1rs1 = bbq[`Rs${b}joueur1`];
    var c = "<@" + joueur1rs1 + ">";
    var joueur2rs1 = bbq[`Rs${b}joueur2`];
    var d = "<@" + joueur2rs1 + ">";
    var joueur3rs1 = bbq[`Rs${b}joueur3`];
    var e = "<@" + joueur3rs1 + ">"
    if (joueur1rs1 !== undefined && joueur2rs1 !== undefined && joueur3rs1 !== undefined) {
        var c1 = c;
        var d1 = d;
        var e1 = e;
        message.channel.send(`RS${b}, départ immédiat !
${c1},${d1},${e1}, Préparez vous au combat
Force et honneur!`
        );
    }
    else if (joueur1rs1 !== undefined && joueur2rs1 !== undefined && joueur3rs1 === undefined) {
        var c1 = c;
        var d1 = d;
        message.channel.send(`RS${b}, départ immédiat !
${c1},${d1}, Préparez vous au combat
Force et honneur!`
        )
    }
    else if (joueur1rs1 !== undefined && joueur2rs1 === undefined && joueur3rs1 === undefined) {
        var c1 = c;
        message.channel.send(`RS${b}, départ immédiat !
${c1}, Prépare toi au combat
Force et honneur!`
        )
    }
    else if (joueur1rs1 === undefined && joueur2rs1 !== undefined && joueur3rs1 === undefined) {
        var d1 = d;
        message.channel.send(`RS${b}, départ immédiat !
${d1}, Prépare toi au combat
Force et honneur!`
        )
    }

    delete bbq["RsTimefinish" + b]; delete bbq["RsTime" + b]; delete bbq["Rs" + b + "joueur1"]; delete bbq["Rs" + b + "joueur2"]; delete bbq["Rs" + b + "joueur3"]; delete bbq["Rs" + b + "joueur4"];

    Savebbq()
}

function Rsfinish(message, x, a, b) {
    var joueur1rs1 = bbq[`Rs${b}joueur1`];
    var c = "<@" + joueur1rs1 + ">";
    var joueur2rs1 = bbq[`Rs${b}joueur2`];
    var d = "<@" + joueur2rs1 + ">";
    var joueur3rs1 = bbq[`Rs${b}joueur3`];
    var e = "<@" + joueur3rs1 + ">"

    if (joueur1rs1 !== undefined && joueur2rs1 !== undefined && joueur3rs1 !== undefined) {
        var c1 = c;
        var d1 = d;
        var e1 = e;
        message.channel.send(`RS${b}, le délai d'attente est dépassé !
${c1},${d1},${e1}, Préparez vous au combat
Force et honneur!`
        );
    }
    else if (joueur1rs1 !== undefined && joueur2rs1 !== undefined && joueur3rs1 === undefined) {
        var c1 = c;
        var d1 = d;
        message.channel.send(`RS${b}, le délai d'attente est dépassé !
${c1},${d1}, Préparez vous au combat
Force et honneur!`
        )
    }
    else if (joueur1rs1 !== undefined && joueur2rs1 === undefined && joueur3rs1 === undefined) {
        var c1 = c;
        message.channel.send(`RS${b}, le délai d'attente est dépassé !
${c1}, Prépare toi au combat
Force et honneur!`
        )
    }
    else if (joueur1rs1 === undefined && joueur2rs1 !== undefined && joueur3rs1 === undefined) {
        var d1 = d;
        message.channel.send(`RS${b}, le délai d'attente est dépassé !
${d1}, Prépare toi au combat
Force et honneur!`
        )
    }

    delete bbq["RsTimefinish" + b]; delete bbq["RsTime" + b]; delete bbq["Rs" + b + "joueur1"]; delete bbq["Rs" + b + "joueur2"]; delete bbq["Rs" + b + "joueur3"]; delete bbq["Rs" + b + "joueur4"];

    Savebbq()
}



client.on('message', async message => {


    if (message.author.bot) return;

    if (message.channel.type === "dm" || message.channel.type === "group") {
        message.channel.send("Chut");
        //alors je fait rien
        return
    }

    if (message.channel.id == "919166681467744307" || message.channel.id == "887348918369812521" || message.channel.id == "887321606341410836" || message.channel.id == "788853849615237140" || message.channel.id == "788853783932436521" || message.channel.id == "782234932684390420" || message.channel.id == "782235014631784480" || message.channel.id == "782235066994524181" || message.channel.id == "782235111000637450" || message.channel.id == "782235165544022026") {
        if (message.channel.id == "887321606341410836") { var rsjoueur = "9"; }
        else if (message.channel.id == "887348918369812521") { var rsjoueur = "10"; }
        else if (message.channel.id == "788853849615237140") { var rsjoueur = "3"; }
        else if (message.channel.id == "788853783932436521") { var rsjoueur = "4"; }
        else if (message.channel.id == "782234932684390420") { var rsjoueur = "5"; }
        else if (message.channel.id == "782235014631784480") { var rsjoueur = "6"; }
        else if (message.channel.id == "782235066994524181") { var rsjoueur = "7"; }
        else if (message.channel.id == "782235111000637450") { var rsjoueur = "8"; }
        else if (message.channel.id == "782235165544022026") { var rsjoueur = "9"; }
        else if (message.channel.id == "919166681467744307") { var rsjoueur = "10"; }
        var nbjoueur = ("1")
        var joueur = message.member.id;
        var list = client.guilds.cache.get(message.guild.id)
        if (message.content.startsWith('!statrs')) {
            var statrs = " "
            var statn = 12
            for (let i = 3; i < statn; i++) {
                if (bbrun[i][joueur]) {
                    if (i === 3) { var rs3 = bbrun[i][joueur] }
                    if (i === 4) { var rs4 = bbrun[i][joueur] }
                    if (i === 5) { var rs5 = bbrun[i][joueur] }
                    if (i === 6) { var rs6 = bbrun[i][joueur] }
                    if (i === 7) { var rs7 = bbrun[i][joueur] }
                    if (i === 8) { var rs8 = bbrun[i][joueur] }
                    if (i === 9) { var rs9 = bbrun[i][joueur] }
                    if (i === 10) { var rs10 = bbrun[i][joueur] }
                    if (i === 11) { var rs11 = bbrun[i][joueur] }
                }
                else {
                    if (i === 3) { var rs3 = 0 }
                    if (i === 4) { var rs4 = 0 }
                    if (i === 5) { var rs5 = 0 }
                    if (i === 6) { var rs6 = 0 }
                    if (i === 7) { var rs7 = 0 }
                    if (i === 8) { var rs8 = 0 }
                    if (i === 9) { var rs9 = 0 }
                    if (i === 10) { var rs10 = 0 }
                    if (i === 11) { var rs11 = 0 }
                }


            }

            message.say(`Vos stats de rs complète en corpo :
${statrs}`)
            const embed = new Discord.MessageEmbed(); // création de l'embed
            embed
                .setColor(`BLACK`) // ou .setColor(`#0099ff`)        

                .setDescription(`
        ***__Vos stats de rs complète en corpo :__***
`)
.addFields(
    { name: 'Rs3 : ', value: `> ${rs3}`,inline: true },
    { name: 'Rs4 : ', value: `> ${rs4}`,inline: true },
    { name: 'Rs5 : ', value: `> ${rs5}`,inline: true },    
)
.addFields(
    { name: 'Rs6 : ', value: `> ${rs6}`,inline: true },
    { name: 'Rs7 : ', value: `> ${rs7}`,inline: true },
    { name: 'Rs8 : ', value: `> ${rs8}`,inline: true },
)
.addFields(
    { name: 'Rs9 : ', value: `> ${rs9}`,inline: true },
    { name: 'Rs10 : ', value: `> ${rs10}`,inline: true },
    { name: 'Rs11 : ', value: `> ${rs11}`,inline: true },
)
                ;
            message.channel.send(embed)
        }
        else if (message.content.startsWith('!helprs')) {
            message.author.send(`
Voici la liste des commandes dispo avec les chans rs:
        
!rsgo ( permet de s'inscrire sur une rs )
!rsquit ( permet de quitter la rs en cours de lancement)
!startrs ( permet de lancer la rs sans attendre la fin du timer)
!delrs ( permet de supprimer la rs en cours)
!addrs (permet d'ajouter un joueur présent ou non sur discord)
!statrs (permet de savoir le nombre de rs ainsi que son level faite en corpo)

        `);
            return false;

        }

        else if (message.content.startsWith('!delrs')) {

            delete bbq["RsTimefinish" + rsjoueur]; delete bbq["RsTime" + rsjoueur]; delete bbq["Rs" + rsjoueur + "joueur1"]; delete bbq["Rs" + rsjoueur + "joueur2"]; delete bbq["Rs" + rsjoueur + "joueur3"]; delete bbq["Rs" + rsjoueur + "joueur4"];
            clearTimeout(x);
            message.say(`La Rs${rsjoueur} vient d'être supprimé`)
        }

        else if (message.content.startsWith('!startrs')) {
            if (bbq["Rs" + rsjoueur + "joueur1"] == joueur || bbq["Rs" + rsjoueur + "joueur2"] == joueur || bbq["Rs" + rsjoueur + "joueur3"] == joueur || bbq["Rs" + rsjoueur + "joueur4"] == joueur) {
                RsStart(message, x, nbjoueur, rsjoueur);
            }
        }
        else if (message.content.startsWith('!rsquit') || message.content.startsWith('-1') || message.content.startsWith('!o')) {
            if (rsjoueur == ('1') || rsjoueur == ('2') || rsjoueur == ('3') || rsjoueur == ('4') || rsjoueur == ('5') || rsjoueur == ('6') || rsjoueur == ('7') || rsjoueur == ('8') || rsjoueur == ('9') || rsjoueur == ('10') || rsjoueur == ('11')) {
                if (bbq["Rs" + rsjoueur + "joueur1"] == joueur) {
                    delete bbq["Rs" + rsjoueur + "joueur1"];
                    message.say(`Tu viens de quitter le groupe Rs${rsjoueur}`)
                }
                else if (bbq["Rs" + rsjoueur + "joueur2"] == joueur) {
                    delete bbq["Rs" + rsjoueur + "joueur2"];
                    message.say(`Tu viens de quitter le groupe Rs${rsjoueur}`)
                }
                else if (bbq["Rs" + rsjoueur + "joueur3"] == joueur) {
                    delete bbq["Rs" + rsjoueur + "joueur3"];
                    message.say(`Tu viens de quitter le groupe Rs${rsjoueur}`)
                }
                else if (bbq["Rs" + rsjoueur + "joueur4"] == joueur) {
                    delete bbq["Rs" + rsjoueur + "joueur4"];
                    message.say(`Tu viens de quitter le groupe Rs${rsjoueur}`)
                }
                else { }
            }

        }
        else if (message.content.startsWith('!addrs') || message.content.startsWith('!rsgo') || message.content.startsWith('+1') || message.content.startsWith('!i')) {
            if (message.content.startsWith('!addrs')) {
                var addjoueur = message.content.substr(7);
                var size = addjoueur.length
                size--;
                var addjoueur2 = addjoueur.slice(3, size);

                if (list.member(addjoueur2)) { var joueur = addjoueur2 }
                else { var joueur = message.content.substr(7) }

            }
            if (bbq["Rs" + rsjoueur + "joueur1"] != joueur && bbq["Rs" + rsjoueur + "joueur2"] != joueur && bbq["Rs" + rsjoueur + "joueur3"] != joueur && bbq["Rs" + rsjoueur + "joueur4"] != joueur) {

                if (rsjoueur == ('1') || rsjoueur == ('2') || rsjoueur == ('3') || rsjoueur == ('4') || rsjoueur == ('5') || rsjoueur == ('6') || rsjoueur == ('7') || rsjoueur == ('8') || rsjoueur == ('9')  || rsjoueur == ('10')) {
                    if (bbq["Rs" + rsjoueur + "joueur" + nbjoueur] != undefined) { var nbjoueur = "2" };
                    if (bbq["Rs" + rsjoueur + "joueur" + nbjoueur] != undefined) { var nbjoueur = "3" };
                    if (bbq["Rs" + rsjoueur + "joueur" + nbjoueur] != undefined) { var nbjoueur = "4" } else { };
                    bbq["Rs" + rsjoueur + "joueur" + nbjoueur] = joueur;
                }
            }

            else { message.say("Déjà inscrit en Rs" + `${rsjoueur}`); return; }
        }

        if (message.content.startsWith('!addrs') || message.content.startsWith('!rsquit') || message.content.startsWith('!rsgo') || message.content.startsWith('+1') || message.content.startsWith('!i') || message.content.startsWith('-1') || message.content.startsWith('!o')) {
            var joueur1rs1 = bbq[`Rs${rsjoueur}joueur1`];
            var joueur1rs3 = "<@" + joueur1rs1 + ">";
            if (list.member(bbq[`Rs${rsjoueur}joueur1`])) { var joueur1rs2 = Countrs(rsjoueur, joueur1rs1) }
            else { var joueur1rs2 = bbq[`Rs${rsjoueur}joueur1`]; var joueur1rs3 = joueur1rs1 }
            var joueur2rs1 = bbq[`Rs${rsjoueur}joueur2`];
            var joueur2rs3 = "<@" + joueur2rs1 + ">";
            if (list.member(bbq[`Rs${rsjoueur}joueur2`])) { var joueur2rs2 = Countrs(rsjoueur, joueur2rs1) }
            else { var joueur2rs2 = bbq[`Rs${rsjoueur}joueur2`]; var joueur2rs3 = joueur2rs1 }
            var joueur3rs1 = bbq[`Rs${rsjoueur}joueur3`];
            var joueur3rs3 = "<@" + joueur3rs1 + ">";
            if (list.member(bbq[`Rs${rsjoueur}joueur3`])) { var joueur3rs2 = Countrs(rsjoueur, joueur3rs1) }
            else { var joueur3rs2 = bbq[`Rs${rsjoueur}joueur3`]; var joueur3rs3 = joueur3rs1 }
            var joueur4rs1 = bbq[`Rs${rsjoueur}joueur4`];
            var joueur4rs3 = "<@" + joueur4rs1 + ">";
            if (list.member(bbq[`Rs${rsjoueur}joueur4`])) { var joueur4rs2 = Countrs(rsjoueur, joueur4rs1) }
            else { var joueur4rs2 = bbq[`Rs${rsjoueur}joueur4`]; var joueur4rs3 = joueur4rs1 }
            if (bbq["Rs" + rsjoueur + "joueur1"] == undefined) { var joueur1rs2 = "En attente" };
            if (bbq["Rs" + rsjoueur + "joueur2"] == undefined) { var joueur2rs2 = "En attente" };
            if (bbq["Rs" + rsjoueur + "joueur3"] == undefined) { var joueur3rs2 = "En attente" };
            if (bbq["Rs" + rsjoueur + "joueur4"] == undefined) { var joueur4rs2 = "En attente" };
            if (bbq["RsTime" + rsjoueur] != "1") {
                var x = setTimeout(Rsfinish, 900000, message, x, nbjoueur, rsjoueur);
                if (rsjoueur == "3") { message.say(`<@&747932799281004706>`) }
                if (rsjoueur == "4") { message.say(`<@&510413017247383602>`) }
                if (rsjoueur == "5") { message.say(`<@&510413178283360257>`) }
                if (rsjoueur == "6") { message.say(`<@&510413252358963210>`) }
                if (rsjoueur == "7") { message.say(`<@&510413302694805514>`) }
                if (rsjoueur == "8") { message.say(`<@&510451065204899851>`) }
                if (rsjoueur == "9") { message.say(`<@&510451285527625730>`) }
                if (rsjoueur == "10") { message.say(`<@&510451340716146728>`) }

            }


            if (bbq["Rs" + rsjoueur + "joueur1"] == undefined && bbq["Rs" + rsjoueur + "joueur2"] == undefined && bbq["Rs" + rsjoueur + "joueur3"] == undefined && bbq["Rs" + rsjoueur + "joueur4"] == undefined) {
                message.say(`La Rs${rsjoueur} vient d'être supprimé`);
                delete bbq["RsTimefinish" + rsjoueur]; delete bbq["RsTime" + rsjoueur]; delete bbq["Rs" + rsjoueur + "joueur1"]; delete bbq["Rs" + rsjoueur + "joueur2"]; delete bbq["Rs" + rsjoueur + "joueur3"]; delete bbq["Rs" + rsjoueur + "joueur4"];
            }
            else {
                Rspost(message, x, nbjoueur, rsjoueur, joueur1rs1, joueur2rs1, joueur3rs1, joueur4rs1, joueur1rs2, joueur2rs2, joueur3rs2, joueur4rs2, joueur1rs3, joueur2rs3, joueur3rs3, joueur4rs3);
            }
        }


        else { };
        Savebbq();
    }
}
)


client.login(process.env.BOT_TOKEN);