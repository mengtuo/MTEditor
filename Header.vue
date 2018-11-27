<template>
<div id="EDHeader">
    <i class="fa fa-header"
        onmousedown="event.preventDefault();"
        title="标题"
        @mouseover="show=true"
        >
    </i>

    <ul v-show="show" @click="show=false" class="HeadList" @mouseleave="show=false">
        <li>设置标题</li>
        <li>
            <h1 onmousedown="event.preventDefault();" @click="execCommand('<h1>')">h1</h1>
        </li>
        <li>
            <h2 onmousedown="event.preventDefault();" @click="execCommand('<h2>')">h2</h2>
        </li>
        <li>
            <h3 onmousedown="event.preventDefault();" @click="execCommand('<h3>')">h3</h3>
        </li>
        <li>
            <h4 onmousedown="event.preventDefault();" @click="execCommand('<h4>')">h4</h4>
        </li>
        <li>
            <h5 onmousedown="event.preventDefault();" @click="execCommand('<h5>')">h5</h5>
        </li>
        <li>
            <h6 onmousedown="event.preventDefault();" @click="execCommand('<h6>')">h6</h6>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: ['showChild'],
    data() {
        return {
            show: false,
            heads: [1, 2, 3, 4, 5, 6]
        };
    },
    methods: {
        execCommand: function (value) {
            document.execCommand("formatBlock", false, value);
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
}
#EDHeader {
    width: 100%;
}
#EDHeader>i{
    width: 100%;
    text-align: center;
}
#EDHeader ul {
    width: 100px;
    background: white;
    position: absolute;
    border: 1px solid lightgray;
    border-top-width: 0;
}

#EDHeader ul li {
    height: 25px;
    border-bottom: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;

}
#EDHeader ul li>h1,h2,h3,h4,h5,h6 {
    width: 100%;
    text-align: center;
}
#EDHeader ul li:hover {
    background: rgb(235, 233, 233);
}
.HeadList {
    margin-top: 7px;
}
</style>
