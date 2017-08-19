var javoidCrypt = (function(undefined) {
    "use strict";

    function test() {

        var iv = new Uint8Array(32),
            alg = { name: 'AES-GCM', iv: iv },
            data = 'To jest napis z polskimi znakami żąśźćęńłó€ro',
            tePlain = new TextEncoder().encode(data),
            pass = 'Hasło1',
            tePass = new TextEncoder().encode(pass);

        // TODO: TextEncoder/TextDecoder to klasy eksperymentalne. Edge ich nie podsiada.
        //  TextEncoder.encode(): string -> Uint8Array(...)
        //  TextDecoder.decode(): ArrayBuffer -> string
        //
        //  Opakować ArrayBuffer, który jest abstrakcyjnym miejscem w pamięci i dostępny
        //      tylko przez np. new Uint8Array(arrBuff)

        console.log('plaintext:', data);
        crypto.subtle.digest('SHA-256', tePass).then(function(keyHash) {
            crypto.subtle.importKey('raw', keyHash, 'AES-GCM', false, ['encrypt','decrypt']).then(function(key) {
                crypto.subtle.encrypt(alg, key, tePlain).then(function(res) {
                    var encArr = new Uint8Array(res)
                    console.log('encrypted:', encArr);
                    crypto.subtle.decrypt(alg, key, res).then(function(plainBuff) {
                        var plain = new TextDecoder().decode(plainBuff);
                        console.log('decrypted:', plain);
                    });
                });
            });
        });
            
    }

    return {
        test: test
    };
})();

if ('function' === typeof(define) && define.amd) {
    define('javoidCrypt', [], function () {
        return javoidCrypt;
    });
}