<template>
  <button>&times;</button>
</template>

<style lang="scss" scoped>
button{
  height:30px;
  min-width:30px;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  transition:0.2s ease background-color;
  color:crimson;
  padding-top:1px;
  font-size:2rem;
  &:active{background-color:#dc143c40;}
} 
</style>