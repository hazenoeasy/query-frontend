<template>
  <el-footer class="me-area">
    <div class="me-footer">
      <div class="me-footer-flex">
        <div
          href="https://github.com/hazenoeasy/Blog-Backend"
          class="me-login-design-color"
        >
          will add some footer later ... :)
        </div>
      </div>
    </div>
  </el-footer>
</template>

<script lang="ts" setup></script>

<style>
.el-footer {
  min-width: 100%;
  box-shadow: 0 -2px 3px hsla(0, 0%, 7%, 0.1), 0 0 0 1px hsla(0, 0%, 7%, 0.1);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1024;
  height: 40px;
}

.me-footer {
  text-align: center;
  line-height: 40px;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
}

.me-footer-flex {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.me-login-design-color {
  color: rgb(108, 108, 108) !important;
}
</style>
