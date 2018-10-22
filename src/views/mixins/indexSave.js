/**
 * function: indexSave
 * author  : wq
 * update  : 2018/9/28 15:46
 */
export default {
  data () {
    return {
      innerComps: [],
      hiddenComps: false
    }
  },
  computed: {
    comps () {
      const child = this.child || []
      const innerComps = this.innerComps
      const hiddenComps = this.hiddenComps
      if (child.length <= 0) {
        if (hiddenComps) {
          return []
        } else {
          return innerComps.map(item => ({
            name: item
          }))
        }
      } else {
        const list = this.innerComps
        const cops = []
        child.forEach((item, idx) => {
          if (this.judgeItem(item)) {
            cops.push({
              name: list[idx],
              children: (Array.isArray(item) && item) || []
            })
          }
        })
        return cops
      }
    }
  },
  methods: {
    judgeItem (data) {
      if (Array.isArray(data)) {
        for (let i in data) {
          if (this.judgeItem(data[i]) === true) {
            return true
          }
        }
        return false
      } else if (data === true) {
        return true
      } else {
        return false
      }
    },
    doSave (bool) {
      const refs = this.$refs
      let valid = true
      for (let i in refs) {
        if (i.indexOf('comp-') === 0) {
          let ref = refs[i]
          if (Array.isArray(ref)) {
            ref = ref[0]
          }
          if (typeof ref.doSave === 'function' && !ref.doSave(bool)) {
            valid = false
          }
        }
      }
      return valid
    }
  }
}
