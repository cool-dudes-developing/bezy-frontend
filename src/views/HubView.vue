<template>
  <div>
    <h1>hub</h1>
    <div class="">Hello, {{ User.currentUser?.name }}</div>
    <button @click="appLoaderTest" class="bg-gray-200 text-slate-900 p-2 m-1">Show app loader for 2s</button>
    <button @click="pageLoaderTest" class="bg-gray-200 text-slate-900 p-2 m-1">Show page loader for 2s</button>
    <button
      @click="$router.push({ name: 'test-editor' })"
      class="bg-gray-200 text-slate-900 p-2 m-1"
    >
      go to test editor
    </button>
    <button class="bg-gray-200 text-slate-900 p-2" @click="User.logout()">logout</button>
    <section>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur nostrum dignissimos iste
      nobis rerum exercitationem alias ea esse corrupti hic id pariatur nesciunt, ad temporibus
      doloribus, expedita est sunt odio minus accusamus, adipisci similique ratione quibusdam
      voluptas! Iure recusandae commodi mollitia eaque consectetur dolor aspernatur. Veniam impedit
      nesciunt aspernatur animi incidunt laboriosam voluptatum fugit illo cupiditate mollitia harum
      debitis, aliquam culpa veritatis libero non quas, optio eveniet beatae maxime neque minima.
      Vel aspernatur hic corporis possimus ea impedit pariatur nulla porro quia accusantium
      consequuntur assumenda delectus id amet debitis, minima velit consectetur reiciendis et
      reprehenderit dolorum? Earum laboriosam labore dicta porro odio velit itaque eveniet fugit
      provident, ipsum adipisci ullam laudantium obcaecati, error quae nisi eius explicabo est saepe
      asperiores molestiae expedita mollitia. Temporibus inventore, est eligendi atque beatae
      perferendis consectetur tempora in, nesciunt at nisi repellendus asperiores ex minima
      laudantium labore ipsa doloremque cumque natus, repellat consequatur. Perspiciatis ea labore
      est sed, magni nostrum placeat, debitis illo et quos ratione, quas voluptates vel provident
      voluptatum delectus consectetur. Amet hic facere sint, placeat, a quod commodi ex aspernatur
      eveniet consectetur doloribus? Temporibus magnam inventore ab quisquam deleniti. Maiores
      corporis quia illo veritatis corrupti amet! Placeat modi quod fugiat ut laborum adipisci iusto
      quis, sunt aliquid minima similique eum ipsum facere inventore facilis id aliquam doloribus
      assumenda asperiores possimus repellendus voluptatum tempore totam. Cum non exercitationem
      quidem inventore ipsum labore autem odit fugit distinctio ullam. Doloribus consequatur
      recusandae saepe, temporibus ullam cupiditate reiciendis totam. Quia quas quaerat quod nisi
      doloribus ab vero tempora corrupti incidunt ad autem aut, blanditiis maiores aperiam.
      Repellendus, rerum maiores? Doloribus perferendis mollitia ab aliquid distinctio nostrum
      inventore exercitationem id vero dolorem magni assumenda quae velit iusto, facilis a dicta
      neque unde quo esse cumque sint! Rerum quisquam aliquam eligendi fugiat ducimus expedita
      assumenda. Facere nostrum dolores ipsam eligendi minima ratione magni voluptate! Culpa
      sapiente molestias sit, aut repellat ratione? Praesentium nulla similique sapiente aliquam
      cumque, assumenda ducimus voluptate eveniet libero quam fugiat voluptatum nemo. Similique
      culpa velit totam? Laborum cupiditate fuga praesentium excepturi aliquid a beatae voluptate
      iure! Ipsam odio, reiciendis quia eaque consequuntur harum quos. Distinctio voluptatum
      praesentium accusamus harum quia explicabo unde nesciunt, iusto aut molestias, modi delectus
      earum! Explicabo quae quibusdam veritatis, neque labore ullam voluptatibus ratione reiciendis
      tenetur corporis, harum amet corrupti rerum possimus? Explicabo, nesciunt expedita, nostrum ea
      deleniti commodi labore iusto, soluta odit eius veniam at tenetur nisi optio fuga blanditiis
      quam debitis laudantium consectetur. Saepe consequatur distinctio quas culpa ullam debitis,
      impedit commodi aspernatur corrupti. Tempore quibusdam eveniet, reprehenderit commodi eius
      quas impedit exercitationem neque vero quisquam tenetur velit, ut dolore reiciendis ullam quos
      quam iste autem deleniti distinctio. Harum quis beatae architecto eum. Tenetur quisquam
      cupiditate eius unde recusandae, voluptates, reiciendis ad molestiae aperiam facere corporis
      libero dolor assumenda accusantium, quas ullam deserunt. Doloremque eaque laborum eveniet quia
      totam ipsam, quod dignissimos similique aperiam voluptatum rerum ipsum sapiente quos saepe
      fugiat, nam facilis deserunt itaque dicta eum, impedit esse ipsa. Eaque quo tempore quasi quis
      aliquid! Iste magni, voluptates pariatur at aliquid iusto officia repellat! Maiores ducimus
      ratione natus quos et modi beatae aperiam, animi vero? Natus doloremque molestias praesentium
      vitae ipsam asperiores quo exercitationem similique dolores possimus recusandae explicabo
      maxime, consequatur velit tenetur nisi sapiente maiores iste ut dignissimos soluta! Officiis
      quibusdam velit atque totam, obcaecati, error architecto eos corrupti, harum aliquid voluptate
      itaque voluptas dicta? Expedita esse commodi doloribus repudiandae repellendus eos officia non
      cumque, dolorum nisi iure rem eligendi ea aliquid provident tempore consequuntur culpa modi
      quasi dicta. Quisquam voluptatem autem necessitatibus reprehenderit saepe cupiditate, sapiente
      hic corrupti doloremque! Eligendi cum hic saepe rem, accusamus incidunt sapiente consequuntur
      blanditiis ad placeat sit, ducimus sed voluptas quaerat mollitia qui ipsam et eveniet dicta
      repellendus aliquam impedit alias culpa voluptatibus. Deleniti atque sed culpa earum deserunt
      soluta quae mollitia sunt excepturi illo sapiente vero, velit delectus cupiditate in odit! Id
      sint libero quibusdam temporibus ipsum dolor molestias ex est, velit illo ducimus! Inventore
      dolorem dolore velit sit adipisci fuga a consectetur, et distinctio, obcaecati autem in
      molestiae facilis ratione quibusdam odit cupiditate suscipit? Saepe deserunt necessitatibus
      debitis quae labore eaque, cupiditate, optio maiores deleniti iusto, totam voluptate. Hic
      iste, ut soluta provident culpa qui, eaque nobis, consectetur impedit in eum? Ad sequi quod
      maxime neque? Dolor perspiciatis ex et sint est quasi porro, sequi totam error reprehenderit
      cumque blanditiis mollitia modi aut veritatis accusamus nulla, voluptatibus quas impedit
      doloribus aperiam. Numquam quis sunt impedit laboriosam accusantium fugit illo, saepe ipsa,
      nostrum doloremque repellendus vel optio adipisci temporibus veritatis eos nobis illum odit
      expedita? Nihil sit debitis repellendus animi similique eaque illum, distinctio magni enim est
      repellat, impedit totam consectetur laboriosam nam fugiat consequuntur consequatur saepe
      pariatur. Nemo vitae nihil officia aspernatur quos, modi optio tempore possimus soluta alias
      rem, fuga itaque non earum quibusdam harum maiores voluptates consequatur aliquam incidunt!
      Delectus et alias impedit sed distinctio quisquam. Ratione at distinctio id reprehenderit
      dolor tempore consectetur esse ipsa fugit fugiat! Blanditiis animi sit quibusdam temporibus
      obcaecati libero ab eius quisquam laboriosam rem architecto earum repudiandae consequuntur
      quos aperiam ipsum quasi voluptatem, quo ipsa nisi recusandae adipisci fugiat. Quo nobis enim
      quibusdam aliquam illo necessitatibus suscipit magnam, eum quisquam ex eaque dolore, sunt
      assumenda earum quos possimus ullam provident nemo? Ipsa explicabo ducimus repellat hic sint,
      quis harum facilis esse, accusamus delectus rem. Nostrum possimus molestiae nobis voluptatibus
      quisquam consectetur nulla ullam beatae aut nisi nihil minus, dicta distinctio et qui illo
      explicabo nam neque unde eveniet sit! Rerum ipsum assumenda ratione animi amet quaerat saepe
      molestiae eveniet, repellat veritatis est et quod ex nesciunt illo perspiciatis? Reiciendis
      sed pariatur blanditiis esse cum, ipsa nisi tenetur, saepe voluptatem dolorem delectus
      nesciunt cupiditate, incidunt voluptates magnam fuga. Ipsa magni quos laboriosam neque
      eligendi ullam fuga totam velit, amet quidem, quasi sint. Officia reiciendis necessitatibus
      praesentium, ex, sit placeat excepturi odit eius repellat esse temporibus quis officiis! Rem,
      repellendus molestiae obcaecati quia eum placeat. Ad iure recusandae maxime. Repellat tenetur
      aliquid obcaecati ab maiores dolor vitae perferendis, quam temporibus minima sapiente.
    </section>
  </div>
</template>
<script lang="ts" setup>
import User from '@/models/User'
import { PageSpinnerKey, SpinnerKey } from '@/symbols'
import { inject } from 'vue'

const spinner = inject(SpinnerKey)
const pageSpinner = inject(PageSpinnerKey)

if (!User.currentUser) {
  pageSpinner?.show()
  User.loadCurrentUser().then(() => {
    pageSpinner?.hide()
  })
}

function appLoaderTest() {
  spinner?.show()
  setTimeout(() => {
    spinner?.hide()
  }, 2000)
}

function pageLoaderTest() {
  pageSpinner?.show()
  setTimeout(() => {
    pageSpinner?.hide()
  }, 2000)
}
</script>
