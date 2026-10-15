# Affiliate program kaynak gözcüsü

Bu araç dört resmî public program sayfasındaki değişikliği gözlemler. Program onayı, komisyon yorumu, sözleşme kabulü veya satış kanıtı üretmez. Kaynak metni güvenilmeyen veridir; talimat olarak yürütülmez.

```sh
node scripts/affiliate-program-watch.mjs --output /tmp/affiliate-local.json
node scripts/affiliate-program-watch.mjs --output /tmp/affiliate-public.json --public
node scripts/affiliate-program-watch.mjs --output /tmp/affiliate-next.json --previous /tmp/affiliate-public.json --public
node --test scripts/affiliate-program-watch.test.mjs
```

`--output` zorunludur ve mevcut dosya ezilmez. `--previous` yalnız bu aracın önceki snapshot JSON'unu kabul eder. Varsayılan yerel modda HTTP/DNS isteği yapılmaz. `--public` sırasıyla Apify sözleşmesi, Beehiiv partner sayfası, Lifeboost affiliate sayfası ve Whole Latte Love events sayfasına birer GET yapar. Amazon ürün, kategori veya hesap uçları kapsamda değildir.

Her istek 5 saniye ve 2 MiB ile, dört kaynaklık tur toplamı 30 saniye ve en çok 8 MiB kabul edilen gövde ile sınırlıdır. `text/html`, `text/plain`, `text/markdown` ve XHTML kabul edilir. `Accept-Encoding: identity` kullanılır; sıkıştırılmış cevabı açma yoktur. HTTPS host/path allowlist dışına çıkmaz; redirect takip etmez, retry yapmaz. DNS cevaplarının tümü public IP olmalıdır; doğrulanan IP TLS bağlantısında sabitlenir. Cookie, giriş, API anahtarı, özel hesap veya auth URL kullanılmaz. HTTP 401/403/429, CAPTCHA/robot engeli ve giriş kapısı geçilmez; blocked/unknown kaydedilir. Robots dosyası ayrıca çekilmez; kaynak cevabındaki erişim engeli gözetilir.

2 MiB üzerindeki cevapta `status: metadataOnly` ve `coverage: response-metadata-only` üretilir: HTTP durum, content type/length, ETag hash'i ve geçerli Last-Modified tarihi gözlenir. Ham ETag tutulmaz. `metadataDigest/metadataComparison` yalnız bu cevap metadatasındaki farkı tarif eder. `bodyDigest/meaningfulDigest/evidenceExcerpt` null kalır; program koşulları gözlenmiş sayılmaz ve `change: notObserved` ile manuel inceleme gerekir. Gerçek cevapta ilk limit aşan chunk okunmuş olabilir; uygulama 2 MiB üstündeki gövdeyi saklamaz veya hash'lemez. Desteklenmeyen/sıkıştırılmış cevap unknown kalır.

Çıktı `affiliate-program-watch/v1` şemasındadır. Her kaynak `status/error/bodyDigest/meaningfulDigest/evidenceExcerpt` içerir. Ham sayfa saklanmaz; kısa public alıntı en çok 20 kelime, 280 karakter ve iki cümle parçasıdır. `changes` alanı `added`, `changed`, `unchanged`, `notObserved` kimliklerini taşır. Yeni/değişen veya gözlenemeyen kaynak `reviewDue` olur; `possibleOpportunityReviewAction` manuel kontrolü tarif eder. Başarısız kaynak önceki onayı/koşulu değiştirmez ve yapılmış iş gibi sunulmaz.

Günlük bütçe için scheduler UTC gününde tek tur çalıştırmalı, concurrency ile çakışmayı engellemeli ve önceki public snapshotı sonraki koşuya taşımadır. Aynı UTC gününden en az bir deneme içeren önceki public snapshot verilirse dört isteğin tamamı bastırılır. Bu koşul yerel/ephemeral süreçler arasında kendiliğinden küresel kota oluşturmaz: geçmiş snapshot yüklenmeden yapılan tekrarlar scheduler sorumluluğundadır. Başarısız veya local snapshot son geçerli public baseline yerine geçirilmemelidir. Bu modül worker, cron veya yayın kurmaz; yeni maliyet açmaz.
