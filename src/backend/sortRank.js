function sortRank(listCosine, dataMatriks) {
    // Sorting nilai rank tertinggi (paling similar) berdasarkan nilai nilai yang ada di listCosine
    // dataMatriks dibutuhkan untuk menentukan nama dokumen apa yang memiliki suatu nilai rank tersebut 
    var rank = new array(listCosine.length);
    var currentHighest = 0;
    var namaCurrentHighest;
    for (var i = 0; i < listCosine.length; i++) {
        rank[i] = new Array(2);
        // rank merupakan matriks baris listCosine.length, kolom 2. 
        // kolom pertama rank menyatakan nilai ranking data, kolom kedua menyatakan nama dokumen yang memiliki rank tersebut
    }
    for (var i = 0; i < listCosine.length; i++) {
        currentHighest = 0;
        for (var j = 0; j < listCosine.length; j++) {
            // Kondisional dimana list cosine memiliki nilai lebih tinggi dari current highest tapi nilainya lebih kecil dari rank yang sudah dimasukkan sebelumnya
            if (listCosine[j] > currentHighest && listCosine[j] < rank[i-1][0]){
                currentHighest = listCosine[j];
                namaCurrentHighest = dataMatriks[j][0];
            }
            // Kondisional dimana ada dua dokumen dengan rank yang nilainya sama
            if (listCosine[j] == currentHighest && dataMatriks[j] != rank[i-1][1]){
                currentHighest = listCosine[j];
                namaCurrentHighest = dataMatriks[j][0];
            }
        }
        rank[i][0] = currentHighest;
        rank[i][1] = namaCurrentHighest;
    }
    return rank;
}
