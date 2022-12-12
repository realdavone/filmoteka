<template>
  <section class="container user-select-none" v-once>
    <Title>DMCA</Title>
    <article>
      Zodpovednosť za porušovanie autorských práv nenesie prevádzkovateľ tohto portálu! Dôvod je ten, 
      že žiadne video sa nenachádza na interných úložiskách. 
      Z toho vyplýva, že prevádzkovateľ nemá žiadnu možnosť si overiť dodržiavanie autorského práva 
      zo strany ostatných webových služieb, ktorí sprístupňujú tento obsah. 
      Prevádzkovateľ nie je majiteľom žiadnych takých webových služieb!
      <br><br>
      Hlavnou úlohou portálu {{url}} je odkazovanie na tzv. embedovaná videá.
      <br><br>
      Táto činnosť je Európskym súdom vyhlásená ako legálna a tým pádom neporušujeme žiadny zákon, zdroje:
      <br><br>
      <ul>
        <li><a href="http://www.scribd.com/doc/244360017/EuGH-C-348-13-Framing" target="_blank">scribd.com</a></li>
        <li><a href="https://edri.org/cjeu-embedding-copyright-infringement" target="_blank">edri.org</a></li>
        <li><a href="https://torrentfreak.com/embedding-copyright-infringement-eu-court-rules-141025/" target="_blank">torrentfreak.com</a></li>  
      </ul>
      <br><br>
      Autorský ochranný zväz za Slovenskú republiku „SOZA“ a Českú republiku „OSA“ taktiež uznáva, 
      že využívanie embedovacích kódov nie je verejným prenosom.
      <br><br>
      V prípade, že ste vlastníkom práv niektorého súboru, berte na vedomie, 
      že odstránením odkazu nebude odobraté skutočné zdrojové video. 
      Musíte kontaktovať vlastníkov serverov a požiadať priamo ich o odstránenie. 
      Portál {{url}} ponúka len odkazy a nie konkrétne súbory!
    </article>
  </section>
</template>

<script setup lang="ts">
import Title from '../components/Content/Title.vue'

const url = location.host
</script>

<style lang="scss" scoped>
section{
  article{
    text-align:justify;
    font-size:0.85rem;
    max-width:1000px;
    ul{
      margin-left:20px;
      li{  
        a{
          font-weight:bold;
          font-size:0.85rem;
          &:hover{
            text-decoration:underline;
            color:var(--theme-color);
          }
        }
      }
    }
  }
}
</style>