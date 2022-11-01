<template>
  <div class="outter">
    <div class="profile">
      <div class="img-socials">
        <div class="img"></div>
        <div class="socials">
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
          <div class="social"></div>
        </div>
      </div>
      <div class="details">
        <div class="skeleton-text" style="height:1.75rem;width:200px"></div>
        <div class="skeleton-text" style="width:220px"></div>
        <div class="bio">
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
          <div class="skeleton-text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  div.outter{
    width:100%;
    display:flex;
    flex-direction:column;
    gap:var(--container-padding);
  }
  div.profile{
    display:flex;
    gap:var(--container-padding);
    width:100%;

    div.img-socials{
      display:flex;
      flex-direction:column;
      gap:10px;

      div.img{
        background:var(--card-color);
        width:250px;
        height:250px;
        border-radius:125px;
        overflow:hidden;
      }
      div.socials{
        display:flex;
        gap:10px;
        height:42px;

        div.social{
          background:var(--card-color);
          width:100%;
          height:100%;
          border-radius:8px;
        }
      }
    }
    div.details{
      display:flex;
      flex-direction:column;
      gap:20px;
      background:var(--dark-color);
      border-radius:15px;
      width:100%;
      div.bio{
        display:flex;
        flex-direction:column;
        gap:0.5rem;
      }
    }
  }

  @media screen and (max-width: 800px) {
    div.profile{
      flex-direction:column;
      align-items:center;
    }
  }
  @media screen and (max-width: 600px) {
    div.profile{gap:var(--container-padding);}
  }
</style>