//Modules
const express = require('express')
const fs = require('fs')
const lancasterStemmer = require('lancaster-stemmer')
const cors = require('cors')
const formidable = require('formidable');

//Constants
const server = express()
const port = 5000

//Endpoints Example
//Variable" global

// Untuk menampung semua nilai rank setiap dokumen yang diolah di fungsi similaritasVektor
var dataCosine = [];

// Untuk menampung isi document dalam string
var docString;

// Untuk menampung isi document dalam array, sudah di stem
var docArray;

// Tabel
var dataMatriks = [["Nama"]];
//Baris pertama(dataMatriks[0]) berisi kata-kata yang merupakan isi document
//Kolom Pertama(dataMatriks[_][0]) adalah nama dari file untuk semua baris selain baris pertama
//Baris pertama kolom pertama berisi "Nama"
//Semua kata sudah di stemming

// Contoh Bentuknya: 
// "Nama", "kata1", "kata2"
// "dokumen2", 5, 2 jika dokumen2 5 ada 1 kata1 dan 2 kata2
// "dokumen1", 3, 4 jika dokumen1 2 ada 3 kata1 dan 4kata2
// Urutan nama dokumen tidak sesuai dengan isi nama2files

//StopWords
var stopwords = ["a","able","about","above","abroad","according","accordingly","across","actually","adj","after","afterwards","again","against","ago","ahead","ain't","all","allow","allows","almost","alone","along","alongside","already","also","although","always","am","amid","amidst","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apart","appear","appreciate","appropriate","are","aren't","around","as","a's","aside","ask","asking","associated","at","available","away","awfully","b","back","backward","backwards","be","became","because","become","becomes","becoming","been","before","beforehand","begin","behind","being","believe","below","beside","besides","best","better","between","beyond","both","brief","but","by","c","came","can","cannot","cant","can't","caption","cause","causes","certain","certainly","changes","clearly","c'mon","co","co.","com","come","comes","concerning","consequently","consider","considering","contain","containing","contains","corresponding","could","couldn't","course","c's","currently","d","dare","daren't","definitely","described","despite","did","didn't","different","directly","do","does","doesn't","doing","done","don't","down","downwards","during","e","each","edu","eg","eight","eighty","either","else","elsewhere","end","ending","enough","entirely","especially","et","etc","even","ever","evermore","every","everybody","everyone","everything","everywhere","ex","exactly","example","except","f","fairly","far","farther","few","fewer","fifth","first","five","followed","following","follows","for","forever","former","formerly","forth","forward","found","four","from","further","furthermore","g","get","gets","getting","given","gives","go","goes","going","gone","got","gotten","greetings","h","had","hadn't","half","happens","hardly","has","hasn't","have","haven't","having","he","he'd","he'll","hello","help","hence","her","here","hereafter","hereby","herein","here's","hereupon","hers","herself","he's","hi","him","himself","his","hither","hopefully","how","howbeit","however","hundred","i","i'd","ie","if","ignored","i'll","i'm","immediate","in","inasmuch","inc","inc.","indeed","indicate","indicated","indicates","inner","inside","insofar","instead","into","inward","is","isn't","it","it'd","it'll","its","it's","itself","i've","j","just","k","keep","keeps","kept","know","known","knows","l","last","lately","later","latter","latterly","least","less","lest","let","let's","like","liked","likely","likewise","little","look","looking","looks","low","lower","ltd","m","made","mainly","make","makes","many","may","maybe","mayn't","me","mean","meantime","meanwhile","merely","might","mightn't","mine","minus","miss","more","moreover","most","mostly","mr","mrs","much","must","mustn't","my","myself","n","name","namely","nd","near","nearly","necessary","need","needn't","needs","neither","never","neverf","neverless","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","no-one","nor","normally","not","nothing","notwithstanding","novel","now","nowhere","o","obviously","of","off","often","oh","ok","okay","old","on","once","one","ones","one's","only","onto","opposite","or","other","others","otherwise","ought","oughtn't","our","ours","ourselves","out","outside","over","overall","own","p","particular","particularly","past","per","perhaps","placed","please","plus","possible","presumably","probably","provided","provides","q","que","quite","qv","r","rather","rd","re","really","reasonably","recent","recently","regarding","regardless","regards","relatively","respectively","right","round","s","said","same","saw","say","saying","says","second","secondly","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sensible","sent","serious","seriously","seven","several","shall","shan't","she","she'd","she'll","she's","should","shouldn't","since","six","so","some","somebody","someday","somehow","someone","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specified","specify","specifying","still","sub","such","sup","sure","t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that's","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","there'd","therefore","therein","there'll","there're","theres","there's","thereupon","there've","these","they","they'd","they'll","they're","they've","thing","things","think","third","thirty","this","thorough","thoroughly","those","though","three","through","throughout","thru","thus","till","to","together","too","took","toward","towards","tried","tries","truly","try","trying","t's","twice","two","u","un","under","underneath","undoing","unfortunately","unless","unlike","unlikely","until","unto","up","upon","upwards","us","use","used","useful","uses","using","usually","v","value","various","versus","very","via","viz","vs","w","want","wants","was","wasn't","way","we","we'd","welcome","well","we'll","went","were","we're","weren't","we've","what","whatever","what'll","what's","what've","when","whence","whenever","where","whereafter","whereas","whereby","wherein","where's","whereupon","wherever","whether","which","whichever","while","whilst","whither","who","who'd","whoever","whole","who'll","whom","whomever","who's","whose","why","will","willing","wish","with","within","without","wonder","won't","would","wouldn't","x","y","yes","yet","you","you'd","you'll","your","you're","yours","yourself","yourselves","you've","z","zero"];

//Array yang isinya nama-nama dokumen, kalau mau ada dokumen baru tinggal tambah di sini
var nama2files = ["contoh.txt", "contoh2.txt"];

//Counter untuk proses, karena function" bersifat async
var sudahMasukMatriks = 0;

//Program utama
const bacaSemuaFile = async () => {
	//Awal Program, memanggil readTxt yang bertugas untuk membaca file
	// *File dibaca di proses di waktu yang berbeda-beda, urutan dokumen dataMatriks tidak sesuai urutan nama2files*
	dataMatriks = [["Nama"]];
	nama2files = [];
	fs.readdirSync('../../test/').forEach(file => {
		nama2files.push(file);
	});
	for (var i = 0; i < nama2files.length; i++) {
		await readTxt(nama2files[i]);
	}
}

async function checkMatriksSiap()
{
	if (sudahMasukMatriks == nama2files.length) 
	{
		console.log("Matriks sudah siap");
		/* Untuk Debugging*/
		// console.log(dataMatriks);
		console.log(dataMatriks)


		exports.dataMatriks = dataMatriks;
		//Export dataMatriks agar bisa dipakai keluar
		//Cara akses dari luar server.js (contoh di main.js), dengan main.js di directory yang sama dengan server.js
		//var dariServerJs = require('./server.js')
		//var dataDokumen = dariServerJs.dataMatriks


		//    dataCosine = similaritasVektor(matriksSearch, dataMatriks);
		//    console.log(sortRank(dataCosine, dataMatriks));
	}
}

async function readTxt(namaFile)
{
	// Terima nama file, cari di folder doc, lalu simpan di docstring,
	// remove stopword dan stemming, simpan di docArray
	// Lalu proses di afterReadTxt (karena asyncronous function)
	var lokasiFile = '../../test/' + namaFile;
	fs.readFile(lokasiFile, function (err, data) {
	    if (err) throw err;
	    docString = data.toString();
	    /* Untuk Debugging*/
	    // console.log(docString);
	    docArray = remove_stopwords(docString);
	    afterReadTxt(namaFile);
	});
}

function afterReadTxt(namaFile)
{
	//test array sudah berisi kata" hasil stemming

	//brsMatriks adalah index baris dimana file ini disimpan
	var brsMatriks = dataMatriks.length;

	//Inisialisasi
	dataMatriks[brsMatriks] = [namaFile];
	for (var i = 1; i < dataMatriks[0].length; i++) {
		dataMatriks[brsMatriks][i] = 0;
	}
	masukTabel(docArray, brsMatriks);
	/* Untuk Debugging*/
	// console.log(docArray);
	// console.log(dataMatriks); 
	
	sudahMasukMatriks += 1;
}

function remove_stopwords(str) {
//remove stopwrod dan stemming
	var result = [];
	var words = str.split(' ');
	for(var i=0;i<words.length;i++) {
		var word_clean = words[i].split("\n").join(".").split(",").join(".").split("!").join(".").split(".").join("")
		var word_clean2 = lancasterStemmer(word_clean)
		if(!stopwords.includes(word_clean)) {
			result.push(word_clean2)
		}
	}
	return(result)
}

function masukTabel(arr, brsMatriks)
{
	//Masukkan data dari arr, yang akan diberi input docArray, ke dataMatriks
	for (var i = 0; i < arr.length; i++) {
		var idx = dataMatriks[0].indexOf(arr[i]);
		/* Untuk Debugging*/
		//console.log("break 1: "+idx)
		if (idx >= 0) //if item di array docArray ada di dalam dataMatriks[0], idx adalah index ditemukannya kata di dataMAtriks[0]
		{
			dataMatriks[brsMatriks][idx] += 1;
		}
		else
		{
			idx = dataMatriks[0].push(arr[i]) - 1;
			/* Untuk Debugging*/
			//console.log("break 2: "+idx)
			for (var j = 1; j < dataMatriks.length - 1; j++) {
				dataMatriks[j][idx] = 0;
			}
			dataMatriks[brsMatriks][idx] = 1;
		}
	}
}

function queryToArray(str)
{
	var kata2query = remove_stopwords(str);
	var arrayFrekuensi = [];
	var idx;
	for (var i = 0; i < kata2query.length; i++) {
		idx = -1;
		for (var j = 0; j < arrayFrekuensi.length; j++) {
			if (arrayFrekuensi[j][0] == kata2query[i])
			{
				idx = j;
			}
		}
		if (idx >= 0)
		{
			arrayFrekuensi[idx][1] += 1;
		}
		else
		{
		var kata = [kata2query[i],1];
		arrayFrekuensi.push(kata);		
		}
	}
	return arrayFrekuensi;
}

function makeRealQueryTable(matriksSearch, dataMatriks) {
	var queryTable = [...dataMatriks]

	matriksSearch.forEach(elementArr => {
		var found = false
		for (var i = 1; i < queryTable[0].length; i++){
			if (elementArr[0] == queryTable[0][i] ) found = true
		}

		if (!found) {
			queryTable[0].push(elementArr[0] )
			for (var i = 1; i < queryTable.length; i++) queryTable[i].push(0)
		}
	})

	var rowQuery = ['Query']
	for (var i = 1; i < queryTable[0].length; i++){
		var found = false
		for (var j = 0; j < matriksSearch.length && !found; j++){
			if (queryTable[0][i] == matriksSearch[j][0] ) {
				found = true
				rowQuery.push(matriksSearch[j][1] )
			}
		}

		if(!found) rowQuery.push(0)
	}

	queryTable.splice(1, 0, rowQuery)
	// console.log("THIS IS THE QUERY TABLE: ")
	// console.log(queryTable)

	queryTable = queryTable[0].map((_, colIndex) => queryTable.map(row => row[colIndex]));
	// console.log("THIS IS THE NEW QUERY TABLE: ")
	// console.log(queryTable)

	queryTable[0][0] = 'Term'

	return queryTable
}

function makeQueryTable(matriksSearch, dataMatriks) {
	// Membuat sebuah table query yang akan di representasikan di Front End
	// inputan:
	// matriksSearch adalah matriks N X 2, dengan N merupakan jumlah setiap kata berbeda,(sama seperti output queryToArray) akses : matriksSearh[i][0] = "kata1" , matriksSearh[i][1] = frekuensi "kata1"
	// dataMatriks matriks N X M + 1 , N adalah jumlah dokumen yang dibaca, M adalah vektor berdimensi M

	// Isi tabel*:
	//	"Term"			"Query"		"D1"	"D2"	"DN"
	//	"Kata1"			A			X		Y		Z
	//	"Kata2"			B			P		Q		R
	//	"Kata3"			C			J		K		L

	console.log("N: " + matriksSearch.length)
	console.log("M: " + dataMatriks.length)
	var tabelQuery = Array.from(Array(matriksSearch.length + 1), () => new Array(dataMatriks.length + 1));
	tabelQuery[0][0] = "Term";
	tabelQuery[0][1] = "Query";
	// loop pembuatan jumlah kolom tabelQuery sebanyak dokumen yang dimiliki ("D1,D2,DN")
	for(var i=0; i<dataMatriks.length - 1; i++) {
		tabelQuery[0][i+2] = dataMatriks[i+1][0];
	}
	// loop pengisian "Term" dan "Query" pada tabel
    for(var i=0; i<matriksSearch.length; i++) {
		tabelQuery[i+1][0] = matriksSearch[i][0];
		tabelQuery[i+1][1] = matriksSearch[i][1];
	}
	// loop pengisian "D1" sampai "DN" pada tabel
	for(var i=0; i<tabelQuery.length - 1; i++) {
		for(var j=0; j<dataMatriks[0].length - 1; j++) {
			if (tabelQuery[i+1][0] == dataMatriks[0][j+1]){
				for(var k=0; k<dataMatriks.length - 1; k++) {				
					tabelQuery[i+1][k+2] = dataMatriks[k+1][j+1]
				}
			}
		}
	}

	return tabelQuery;
	// *tabelQuery yang di return sama seperti isi tabel yang ditulis diatas.
}

function similaritasVektor(tabelQuery) {
	// Menghitung nilai cosinus similaritas terhadap Query dengan setiap dokumen yang and
	// inputan:
	// tabelQuery didapat dari return fungsi makeQueryTable
	// matriksSearch merupakan matriks dua dimensi 2XN,  inputan searching yang sudah dibuat menjadi vektor
	
	// Contoh masukan : similaritasMatriks(makeQueryTable(matriksSearch, dataMatriks));
	// Contoh keluaran : [0.8273,0.21333,1,0.333];
	console.log(tabelQuery[0].length)
    var listCosine = new Array(tabelQuery[0].length - 2);
    var rootsqrSearch = 0;
	var rootsqrData = 0;
	// matriksSearch = [["dia",2],["adalah",4],["dedlener",100]];

    for(var i=0; i<tabelQuery[0].length - 2; i++) {
		rootsqrSearch = 0;
		rootsqrData = 0;
		listCosine[i] = 0;
        for(var j=0; j<tabelQuery.length - 1; j++) {
            // tabelQuery[i].length - 2, karena untuk tabelQuery[0], isinya merupakan nama dari data matriks di baris tersebut
            listCosine[i] += tabelQuery[j+1][1] * tabelQuery[j+1][i+2];
            rootsqrSearch += tabelQuery[j+1][1] ** 2;
            rootsqrData += tabelQuery[j+1][i+2] ** 2;
        }
		console.log('PERHITUNGAN')
		console.log(listCosine[i] )
		console.log(rootsqrData)
		console.log(rootsqrSearch)
        rootsqrSearch = Math.sqrt(rootsqrSearch);
        rootsqrData = Math.sqrt(rootsqrData);
		console.log('AKAR2')
		console.log(rootsqrData)
		console.log(rootsqrSearch)
		if (rootsqrSearch == 0 || rootsqrData == 0) listCosine[i] = 0
        else listCosine[i] /= (rootsqrSearch * rootsqrData)
    }
    return listCosine;
    // listCosine merupakan array dengan setiap baris merupakan nilai rank setiap baris di dataMatriks, sort dilakukan di fungsi sortRank.
}

function sortRank(listCosine, dataMatriks) {
	// Sorting nilai rank tertinggi (paling similar) berdasarkan nilai nilai yang ada di listCosine
	// inputan:
	// listCosine didapat dari return fungsi similaritasMatriks
	// dataMatriks adalah matriks N X M + 1 , N adalah jumlah dokumen yang dibaca, M adalah vektor berdimensi M
	// Catatan : Sort bukan berdasar nama, tapi berdasar presentase.

	// Contoh masukan : sortRanking([0.8273,0.21333,1,0.333],dataMatriks);

	// Isi rank*:
	//	"Nama"			"Presentase"		"Isi"
	//	"Dokumen3"			96			"apapun isi yang ada didalam dokumen 3 ini, masih ada koma atau simbol lainnya AKA belum di stemming"
	//	"Dokumen1"			45			"kalau presentase sama, sorting mungkin bisa random untuk kedua dokumen tersebut"
	//	"Dokumen2"			45			"begitulah."
	
    // dataMatriks dibutuhkan untuk menentukan nama dokumen apa yang memiliki suatu nilai rank tersebut 
    var rank = [];

	console.log("The dataMatriks now: ")
	console.log(dataMatriks)

    for (var i = 0; i < listCosine.length; i++) {
        const percentage = listCosine[i] * 100;
		const name = dataMatriks[i+1][0];

		const lokasiFile = '../../test/' + (dataMatriks[i+1][0]);
		const content = fs.readFileSync(lokasiFile,'utf8')

		rank.push({
			nama: name,
			persentase: percentage,
			isi: content
		})
    }

	rank.sort( (a, b) => b.persentase - a.persentase)
	return rank;
}

//Enabling all CORS Requests
server.use(cors() )

//Starting the server
server.listen(port, async () => {
	console.log(`Server listening at http://localhost:${port}`)
	await bacaSemuaFile()
	await checkMatriksSiap()
})

//Endpoints test
server.get('/txt', (req, res) => {
    res.send(dataMatriks)
})

//Endpoint 1: To upload file
server.post('/upload', (req, res) => {
	try {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			var oldpath = files.filetoupload.path;
			var newpath = '../../test/' + files.filetoupload.name;
			fs.rename(oldpath, newpath, function (err) {
				if (err) throw err
				bacaSemuaFile()
				res.send('File uploaded and moved!')
			})
		})
	} catch (e) {
		throw e
	}
})

//Endpoint 2: Search
server.get('/search', (req, res) => {
	console.log("The query: " + req.query.q)
	var arrQuery = queryToArray(req.query.q)
	console.log("The arrQuery: ")
	console.log(arrQuery)
	console.log("The dataMatriks: ")
	console.log(dataMatriks)
	var queryTable = makeRealQueryTable(arrQuery, dataMatriks)
	var queryTableShown = makeQueryTable(arrQuery, dataMatriks)
	console.log("The queryTable: ")
	console.log(queryTable)
	var listCosine = similaritasVektor(queryTable)
	console.log("The listCosine: ")
	console.log(listCosine)
	var rank = sortRank(listCosine, dataMatriks)

	res.send({
		searchResult: rank,
		table: queryTableShown
	})
})
