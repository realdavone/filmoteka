<template>
  <div class="title">
    <div class="details">
      <div v-for="i in 4" :key="i" class="detail">
        <div class="skeleton-text" style="height:1.25rem;"></div>
        <div class="skeleton-text"></div>
      </div>
    </div>
    <div class="skeleton-text" style="height:1.25rem;width:160px"></div>
    <div class="ratings">
      <div>
        <div class="rating" v-for="i in 4" :key="i"></div>
      </div>
    </div>
    <div class="skeleton-text" style="height:1.25rem;width:160px"></div>
    <div class="overview">
      <div class="skeleton-text" v-for="row in 3" :key="row"></div>
    </div>
    <div class="creators">
      <div v-for="i in 2" :key="i" class="creator">
        <div>
          <div v-for="j in 2" :key="j" class="skeleton-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.title{
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:1rem;
  max-width:1000px;
  width:100%;
  background-color:var(--card-color);
  padding:1rem;
  border-radius:1rem;
  div.details, div.creators{
    width:100%;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(130px,1fr));
    gap:10px;
    div.detail{
      display:flex;
      gap:10px;
      flex-direction:column;
    }
    div.creator{
      display:flex;
      gap:0.5rem;
      div{
        display:flex;
        width:50%;
        flex-direction:column;
        gap:0.5rem;
      }
    }
  }
}
div.ratings{
  align-self:flex-start;
  & > div:last-of-type{
    display:flex;
    align-items:center;
    gap:15px;
  }
  div.rating{
    width:40px;
    height:40px;
    background-color:var(--card-color-hover);
    border-radius:50%;
    &:nth-child(1){
      width:60px;
      height:60px;
    }
  }
}
div.overview{
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:5px;
  align-self:stretch;
}
@media screen and (max-width: 1300px) {
  div.title{ align-self:center; }
}
</style>