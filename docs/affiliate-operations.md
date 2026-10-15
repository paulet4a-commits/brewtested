# Affiliate operasyon denetçisi

15 Ekim 2026. Kaynak: yerel içerik/ürün kodu ve isteğe bağlı BrewTested HTTP gözlemleri.

CLI her çağrıda tek sefer çalışan, bağımlılıksız bir Node denetçisidir. GitHub Actions workflow'u ayrıca günlük çağrı için kurulmuştur. Hesap açmaz, başvuru göndermez, içerik yayımlamaz, mesaj göndermez ve model çağırmaz. Yeni ücretli hizmet kullanmaz.

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
- Örnekleme önce `/posts/<rehber>` URL'lerini seçer. Uygun adaylar sıralanır ve UTC gününe göre kaydırılır; aynı gün aynı aday kümesinde aynı üç URL seçilir, URL tekrarlanmaz. Rehber yoksa diğer iç sayfalar kullanılır; yeterli rehber yoksa kalan örnekler diğer sayfalardan tamamlanır. Gün veya sitemap/robots adayları değişince örnek kümesi değişebilir. Bu örnekleme kapsamlı bağlantı taraması değildir. Testlerde tarih `checkPublic({ today: '2026-10-15' })` ile sabitlenebilir.
- Bulgular sabit kimlikle tekilleşir; `changes.added`, `changed`, `resolved`, `unchanged` ayrılır. Tekrar gözlenmeyen HTTP sorunu `notObserved` olur; düzeldiği iddia edilmez. Durum/yanıt gövdesi değişimleri `httpChanged` içindedir. Bir sonraki bildirim katmanı yalnız yeni/değişen bulguları gönderebilir; araç bildirim göndermez. HTTP ve yerel kapsamı karıştıran önceki rapor reddedilir.

`sourceDigest` yalnız okunan içerik ve ürün kayıtlarının SHA-256 özetidir; bütün depo veya yayın sürümü kanıtı değildir. HTTP `bodyDigest` yanıt gövdesinin özetidir; dinamik gövde de özeti değiştirebilir. Özet değişimi içerik doğruluğu, yeni koşul veya satış kanıtı sayılmaz. `ageDays` her gün artabilir; eşik aşılmadıkça yalnız günün değişmesi bulguyu yeni/değişmiş yapmaz. Tarih yaşı kaynakta yazan tarihe dayanır, bağımsız ürün incelemesi değildir.

Trafik, satış, komisyon, hesap onayı, ödeme kurulumu, iddiaların dayanakları, yayındaki içerikle yerelin eşitliği ve örneklenmeyen bağlantılar için **ölçüm yok**. Tarih güncelliği kod beyanıdır; gerçek ürün doğrulaması yapılmaz. İddia eşleşmesi yanlışlık hükmü değildir, insan incelemesi gerektirir. HTTP 200 yalnız erişim gözlemidir; sayfanın doğru, indekslenmiş veya satış yapar olduğunu göstermez.

## GitHub üzerinde işletim ve doğrulama

Mevcut public GitHub Actions/Pages deposunda `Affiliate operations` workflow'u eklendi. Günlük zamanlama **05:17 UTC / 08:17 Türkiye** ve manuel `workflow_dispatch` yapılandırıldı. Yerel PC'nin açık olması gerekmez; zamanlanmış kontrol anlık akış değildir.

15 Ekim 2026 [ilk manuel hosted gözlem koşusu](https://github.com/paulet4a-commits/brewtested/actions/runs/38725960111) başarıyla rapor üretti: yedi site HTTP gözleminin yedisi 200, dört program kaynağının üçü okunabildi; Beehiiv erişim engeli olarak kaldı. Bu koşu, sonraki günlük rehber rotasyonu düzeltmesinden önceki örnekleyiciyi kullandı. Rotasyon düzeltmesinin yerel ops testleri 15/15 geçti. Doğal günlük cron koşusunun devam kanıtı henüz yoktur; sonraki koşu tarihleri GitHub'dan doğrulanmalıdır.

Önceki rapor aynı kapsamla karşılaştırılır; cache karşılaştırma içindir ve ana işletme kaydı değildir. Günlük program tekrarlarını bastırma, önceki snapshot'ın aynı dal kapsamında başarıyla saklanmasına bağlıdır; cache kaybı veya başarısız koşudan sonra kesin küresel günlük çağrı sınırı iddia edilmez. Raporlar ve GitHub çalışma sonucu ayrı değerlendirilir: rapor üretimi başarısı bütün kaynakların okunabildiğini göstermez. Hesap gelir verileri yalnız yetkili hesap bağlantısından ayrıca alınmalıdır.
