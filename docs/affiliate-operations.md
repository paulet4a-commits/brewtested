# Affiliate operasyon denetçisi

15 Ekim 2026. Kaynak: yerel içerik/ürün kodu ve isteğe bağlı BrewTested HTTP gözlemleri.

Bu araç tek seferlik, bağımlılıksız bir Node denetçisidir. Sürekli servis veya zamanlayıcı kurulmadı. Hesap açmaz, başvuru göndermez, içerik yayımlamaz, mesaj göndermez ve model çağırmaz. Yeni ücretli hizmet kullanmaz.

## Çalıştırma

Site dizininden, Node 20+:

```sh
node scripts/affiliate-ops.mjs
node scripts/affiliate-ops.mjs --output docs/reports/affiliate-ops-2026-10-15-local.json
node scripts/affiliate-ops.mjs --public --output docs/reports/affiliate-ops-2026-10-15-public.json
node scripts/affiliate-ops.mjs --public --previous docs/reports/affiliate-ops-2026-10-15-public.json --output docs/reports/affiliate-ops-next-public.json
node --test scripts/affiliate-ops.test.mjs
```

Varsayılan işlem yalnız yerel okuma ve standart çıktıdır. Dosya yazmak için açık `--output` gerekir; üst dizin önceden bulunmalı, hedef yeni `.json` olmalı. Var olan dosya üzerine yazılmaz. Önceki rapor `affiliate-operations/v1` şemasında ve aynı yerel/kamusal kapsamda olmalıdır.

## Ölçülenler ve sınırlar

- MD/MDX içerik tarihleri, inceleme tarihi beyanı, kişisel test iddiası adayları, ham Amazon yönlendirmeleri.
- Ürün kodunda aktif/doğrulanmamış durum, inceleme güncelliği ve `approved` yönlendirme bayrakları. `discontinued` dışındaki bütün ürünler inceleme kuyruğunda kalır; `products[].status` kaynak durumunu korur. `activeCodeProducts` yalnız aktifleri, `unverifiedCodeProducts` doğrulanmamışları, `reviewQueueProducts` kuyruğu, `staleCodeProducts` kuyruktaki tarihi geçmişleri sayar. Bütün ürünlerin doğrulanmamış olması kayıt biçimini geçersiz yapmaz. TypeScript dosyası çalıştırılmaz; mevcut kayıt biçimi statik ayrıştırılır. Yinelenen ürün anahtarları ayrıca raporlanır; JavaScript gibi son tanım kullanılır. Kod bayrağı hesap onayı kanıtı değildir.
- `--public`: yalnız `https://brewtested.pulsedash-app.com` için robots, ana sayfa, en fazla üç sitemap ve üç örnek iç bağlantı. En fazla 10 GET, yanıt başına 1 MiB, toplam 30 saniye bütçe; DNS çözümü IPv4 genel adresle sabitlenir. Yönlendirme takip edilmez; harici alan adı, kullanıcı bilgisi, sorgu, parça ve özel port reddedilir. Robots alınamazsa gezinme durur. Disallow kuralları bütün gruplar için ihtiyatlı uygulanır.
- Bulgular sabit kimlikle tekilleşir; `changes.added`, `changed`, `resolved`, `unchanged` ayrılır. Tekrar gözlenmeyen HTTP sorunu `notObserved` olur; düzeldiği iddia edilmez. Durum/yanıt gövdesi değişimleri `httpChanged` içindedir. Bir sonraki bildirim katmanı yalnız yeni/değişen bulguları gönderebilir; araç bildirim göndermez. HTTP ve yerel kapsamı karıştıran önceki rapor reddedilir.

Trafik, satış, komisyon, hesap onayı, ödeme kurulumu, iddiaların dayanakları, yayındaki içerikle yerelin eşitliği ve örneklenmeyen bağlantılar için **ölçüm yok**. Tarih güncelliği kod beyanıdır; gerçek ürün doğrulaması yapılmaz. İddia eşleşmesi yanlışlık hükmü değildir, insan incelemesi gerektirir. HTTP 200 yalnız erişim gözlemidir; sayfanın doğru, indekslenmiş veya satış yapar olduğunu göstermez.

## Kalıcı işletim için sonraki adım

Hedef işletim, mevcut GitHub Actions/Pages deposunda günlük zamanlama ve `workflow_dispatch`, kamusal kontroller ve rapor artifact'larıdır. Yerel PC'nin açık olması gerekmez; zamanlanmış kontrol anlık akış değildir. Önceki rapor korunmalı ve aynı kapsamla karşılaştırılmalı; yeni/değişen bulgular mevcut yetkili kanala aktarılmalı. Bu belge, böyle bir workflow'un kurulduğu veya çalıştığı anlamına gelmez. Hesap gelir verileri yalnız yetkili hesap bağlantısından ayrıca alınmalıdır.
