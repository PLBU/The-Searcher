function similaritasVektor(arraySearch, dataMatriks) {
    // Menghitung nilai cosinus similaritas terhadap isi kedua array
    // arraySearch merupakan array inputan searching yang sudah dibuat menjadi vektor
    var listCosine = new Array(dataMatriks.length);
    var rootsqrSearch = 0;
    var rootsqrData = 0;

    for(var i=0; i<dataMatriks.length; i++) {
        for(var j=0; j<dataMatriks[i].length - 1; j++) {
            // dataMatriks[i].length - 1, karena untuk dataMatriks[0], isinya merupakan nama dari data matriks di baris tersebut
            listCosine[i] += arraySearch[j] * dataMatriks[i][j+1];
            rootsqrSearch += arraySearch[j] ** 2;
            rootsqrData += dataMatriks[i][j] ** 2;
        }
        rootsqrSearch = Math.sqrt(rootsqrSearch);
        rootsqrData = Math.sqrt(rootsqrData);
        listCosine[i] /= (rootsqrSearch * rootsqrData)
    }
    return listCosine;
    // listCosine merupakan array dengan setiap baris merupakan nilai rank setiap baris di dataMatriks, sort dilakukan di fungsi sortRank.
}
