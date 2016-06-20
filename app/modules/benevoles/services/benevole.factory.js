'use strict';

angular.module('interventions').factory('Benevole',
  function ($q, $timeout) {

    var id = 0;
    var Benevole = function (params) {
      _.assign(this, params);
      this._id = params._id || ++id;
      this.fullname = this.toString();
      //this.avatar = 'https://premium.wpmudev.org/forums/?bb_attachments=712464&bbat=47619&inline';
    };

    Benevole.count = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(benevoles.length);
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.remove = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve();
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.sendMessage = function (message) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(message);
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    var benevoles = _.map([{
      'prenom': 'Gregory',
      'nomFamille': 'Wheeler',
      'avatar': 'https://robohash.org/accusantiumquodsequi.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Gloria',
      'nomFamille': 'Jones',
      'avatar': 'https://robohash.org/omnisetconsequatur.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Kimberly',
      'nomFamille': 'Medina',
      'avatar': 'https://robohash.org/minusautvoluptatum.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Bruce',
      'nomFamille': 'Simmons',
      'avatar': 'https://robohash.org/eaquenatusvoluptates.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/nonutdoloribus.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Roy',
      'nomFamille': 'Moore',
      'avatar': 'https://robohash.org/quoslaudantiumnulla.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Angela',
      'nomFamille': 'Young',
      'avatar': 'https://robohash.org/fugiatcorruptiaut.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Timothy',
      'nomFamille': 'Weaver',
      'avatar': 'https://robohash.org/molestiaecorruptiet.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Brandon',
      'nomFamille': 'Olson',
      'avatar': 'https://robohash.org/occaecatiatperspiciatis.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Bonnie',
      'nomFamille': 'Turner',
      'avatar': 'https://robohash.org/etsintvitae.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Elizabeth',
      'nomFamille': 'Rivera',
      'avatar': 'https://robohash.org/essevoluptateautem.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Edward',
      'nomFamille': 'Ray',
      'avatar': 'https://robohash.org/quiassumendaaliquid.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/optiovoluptateid.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Juan',
      'nomFamille': 'Fields',
      'avatar': 'https://robohash.org/quinonquod.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Terry',
      'nomFamille': 'Greene',
      'avatar': 'https://robohash.org/uteaet.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Bennett',
      'avatar': 'https://robohash.org/errorquosprovident.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Morrison',
      'avatar': 'https://robohash.org/voluptateveritatisomnis.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Peter',
      'nomFamille': 'Sullivan',
      'avatar': 'https://robohash.org/atestest.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Spencer',
      'avatar': 'https://robohash.org/sequierrorveritatis.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Sandra',
      'nomFamille': 'Chapman',
      'avatar': 'https://robohash.org/eteiusneque.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Bonnie',
      'nomFamille': 'Rodriguez',
      'avatar': 'https://robohash.org/nisicumdolore.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Denise',
      'nomFamille': 'Fernandez',
      'avatar': 'https://robohash.org/voluptatemfugiatreprehenderit.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Watkins',
      'avatar': 'https://robohash.org/incidunteligendirerum.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Stephens',
      'avatar': 'https://robohash.org/eaquefaceresuscipit.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Frank',
      'nomFamille': 'Snyder',
      'avatar': 'https://robohash.org/omnisenimvel.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Meyer',
      'avatar': 'https://robohash.org/dolorassumendavero.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Jerry',
      'nomFamille': 'Boyd',
      'avatar': 'https://robohash.org/suntnecessitatibusipsa.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Larry',
      'nomFamille': 'Peterson',
      'avatar': 'https://robohash.org/eaquiasapiente.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Brian',
      'nomFamille': 'Wright',
      'avatar': 'https://robohash.org/nontemporibusid.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Larry',
      'nomFamille': 'Reed',
      'avatar': 'https://robohash.org/perferendisestreiciendis.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ernest',
      'nomFamille': 'Reyes',
      'avatar': 'https://robohash.org/sapientemaioressint.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Margaret',
      'nomFamille': 'Owens',
      'avatar': 'https://robohash.org/consequunturaniminam.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Martin',
      'nomFamille': 'Wilson',
      'avatar': 'https://robohash.org/numquamvelitquia.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Hughes',
      'avatar': 'https://robohash.org/animietvoluptas.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Gloria',
      'nomFamille': 'Romero',
      'avatar': 'https://robohash.org/quisdoloremex.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Randy',
      'nomFamille': 'Garza',
      'avatar': 'https://robohash.org/quislaboriosamullam.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Cheryl',
      'nomFamille': 'Ortiz',
      'avatar': 'https://robohash.org/dolormolestiassed.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Jordan',
      'avatar': 'https://robohash.org/voluptatemlaborumnumquam.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Diana',
      'nomFamille': 'Murphy',
      'avatar': 'https://robohash.org/voluptatemeafuga.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Matthew',
      'nomFamille': 'Hanson',
      'avatar': 'https://robohash.org/voluptatemfugitaccusantium.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Schmidt',
      'avatar': 'https://robohash.org/voluptatemesseomnis.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joshua',
      'nomFamille': 'Bryant',
      'avatar': 'https://robohash.org/quipariaturvelit.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Gregory',
      'nomFamille': 'Martinez',
      'avatar': 'https://robohash.org/laborefugaeum.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Harry',
      'nomFamille': 'Baker',
      'avatar': 'https://robohash.org/enimutdolorem.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'David',
      'nomFamille': 'Gomez',
      'avatar': 'https://robohash.org/rerumutaut.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jack',
      'nomFamille': 'Riley',
      'avatar': 'https://robohash.org/natusquiaccusamus.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Nicholas',
      'nomFamille': 'Henry',
      'avatar': 'https://robohash.org/quidemillodoloribus.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Boyd',
      'avatar': 'https://robohash.org/sitnecessitatibushic.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Karen',
      'nomFamille': 'Price',
      'avatar': 'https://robohash.org/quosaccusamusunde.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Margaret',
      'nomFamille': 'Payne',
      'avatar': 'https://robohash.org/suscipitharumad.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Karen',
      'nomFamille': 'Jenkins',
      'avatar': 'https://robohash.org/sitquivoluptatem.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Carroll',
      'avatar': 'https://robohash.org/nostrummaximeculpa.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Kelley',
      'avatar': 'https://robohash.org/temporaenimomnis.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ann',
      'nomFamille': 'Hawkins',
      'avatar': 'https://robohash.org/corruptipraesentiumprovident.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Barbara',
      'nomFamille': 'Cole',
      'avatar': 'https://robohash.org/sitexercitationemdeserunt.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Alice',
      'nomFamille': 'Morrison',
      'avatar': 'https://robohash.org/velutipsam.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Cook',
      'avatar': 'https://robohash.org/quaerationenobis.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jeffrey',
      'nomFamille': 'Stephens',
      'avatar': 'https://robohash.org/impediteosquisquam.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Smith',
      'avatar': 'https://robohash.org/abpraesentiumfugiat.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ruth',
      'nomFamille': 'Bailey',
      'avatar': 'https://robohash.org/atcorporisquidem.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Robin',
      'nomFamille': 'Harrison',
      'avatar': 'https://robohash.org/doloreestquia.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Clark',
      'avatar': 'https://robohash.org/nihilasperioresfugiat.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Diane',
      'nomFamille': 'Rice',
      'avatar': 'https://robohash.org/laudantiumcorruptivel.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Wanda',
      'nomFamille': 'George',
      'avatar': 'https://robohash.org/assumendaaccusantiumquia.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Victor',
      'nomFamille': 'Mills',
      'avatar': 'https://robohash.org/aspernaturrerumquaerat.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Shawn',
      'nomFamille': 'Romero',
      'avatar': 'https://robohash.org/sedreprehenderitporro.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Cynthia',
      'nomFamille': 'Olson',
      'avatar': 'https://robohash.org/eaquosest.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Helen',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/aspernaturdolorharum.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Willis',
      'avatar': 'https://robohash.org/mollitiaquimaiores.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Barbara',
      'nomFamille': 'Ward',
      'avatar': 'https://robohash.org/omnisomnisquam.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anthony',
      'nomFamille': 'Hudson',
      'avatar': 'https://robohash.org/harumquipossimus.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Hayes',
      'avatar': 'https://robohash.org/temporedoloresneque.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jean',
      'nomFamille': 'Day',
      'avatar': 'https://robohash.org/utrerumvoluptas.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Doris',
      'nomFamille': 'Dean',
      'avatar': 'https://robohash.org/autrepellendusdolorum.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Robert',
      'nomFamille': 'Harrison',
      'avatar': 'https://robohash.org/inventorecorruptieos.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Rice',
      'avatar': 'https://robohash.org/autcumquecum.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Albert',
      'nomFamille': 'Rodriguez',
      'avatar': 'https://robohash.org/eosabaccusamus.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Deborah',
      'nomFamille': 'Ford',
      'avatar': 'https://robohash.org/evenietnullaexplicabo.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'William',
      'nomFamille': 'Fernandez',
      'avatar': 'https://robohash.org/similiquedistinctiocommodi.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Judy',
      'nomFamille': 'Sanders',
      'avatar': 'https://robohash.org/corporishicaut.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Maria',
      'nomFamille': 'Wood',
      'avatar': 'https://robohash.org/idrepellendusquia.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Clarence',
      'nomFamille': 'Gray',
      'avatar': 'https://robohash.org/quideseruntab.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joshua',
      'nomFamille': 'Sanchez',
      'avatar': 'https://robohash.org/eiusutdolorem.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Morris',
      'avatar': 'https://robohash.org/quisteneturipsam.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Warren',
      'avatar': 'https://robohash.org/utlaboriosamdistinctio.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Susan',
      'nomFamille': 'Brown',
      'avatar': 'https://robohash.org/harumquoquod.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Denise',
      'nomFamille': 'Cole',
      'avatar': 'https://robohash.org/voluptatibusdoloresassumenda.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'George',
      'nomFamille': 'Roberts',
      'avatar': 'https://robohash.org/dolorumvitaemollitia.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Peter',
      'nomFamille': 'Fisher',
      'avatar': 'https://robohash.org/estminusipsa.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Richard',
      'nomFamille': 'Hart',
      'avatar': 'https://robohash.org/utnatusaspernatur.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anne',
      'nomFamille': 'Welch',
      'avatar': 'https://robohash.org/vitaequiodio.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Terry',
      'nomFamille': 'Grant',
      'avatar': 'https://robohash.org/etteneturnihil.png?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Craig',
      'nomFamille': 'Barnes',
      'avatar': 'https://robohash.org/voluptatibuscumquelabore.jpg?size=75x75&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Clarence',
      'nomFamille': 'Wells',
      'avatar': 'https://robohash.org/adipsumconsequatur.jpg?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Henry',
      'nomFamille': 'Coleman',
      'avatar': 'https://robohash.org/quasisimiliqueea.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Joyce',
      'nomFamille': 'Bishop',
      'avatar': 'https://robohash.org/excepturideleniticonsectetur.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jason',
      'nomFamille': 'Gonzales',
      'avatar': 'https://robohash.org/laboriosamasperioressed.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anna',
      'nomFamille': 'Weaver',
      'avatar': 'https://robohash.org/faceredoloribussed.bmp?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Martin',
      'nomFamille': 'Garza',
      'avatar': 'https://robohash.org/autemsedoptio.png?size=75x75&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Cynthia',
      'nomFamille': 'Hughes',
      'avatar': 'https://robohash.org/namaliquamsed.bmp?size=75x75&set=set1',
      'role': 'Interventant'
    }], function (benevole) {
      return new Benevole(benevole);
    });

    Benevole.find = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(benevoles);
      }, 1000);
      return deffered.promise;
    };
    Benevole.findById = function (id) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(_.find(benevoles, '_id', id));
      }, 1000);
      return deffered.promise;
    };
    Benevole.search = function (term) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(_.filter(benevoles, function (benevole) {
          return _.includes(benevole.toString().toLowerCase(), term.toLowerCase());
        }));
      }, 1000);
      return deffered.promise;
    };

    return Benevole;

  });
