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

	var tabelQuery = [];
	tabelQuery[0][0] = ["Term"];
	tabelQuery[0][1] = ["Query"];
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