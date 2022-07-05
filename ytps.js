/*
Beat out yt save playlist

*/

(function() {
    'use strict';
    function querySelector(selector) {
        var el = document.querySelector(selector);
        if (!el) {
            throw new Error('Selector returned nothing: ' + selector);
        }
        return el;
    }
    
    var SCENE = querySelector('#scenes');

    var BeatOutYTsavePlaylist = null;

    var BUTS = querySelector('.but');
    var ASSETS_BASE = 'https://assets.scratch.mit.edu/internalapi/asset/';
    var ASSETS_SUFFIX = '/get/';
    var menu = document.createElement('div');
    menu.innerHTML = ``;

    var Timer = function() {
        this.trials = [];
        this.last_trial = 0;
        this.start_time = 0;
    };
    
    Timer.prototype.time = function() {
        return Date.now();
    };
    
    Timer.prototype.start = function() {
        this.start_time = this.time();
    };
    
    Timer.prototype.stop = function() {
        this.end = this.time();
        this.last_trial = end - start_time;
        this.trials.push(last_trial);
    };
    
    Timer.prototype.count = function() {
        return trials.length;
    };
    
    Timer.prototype.average = function() {
        var sum = 0;
        for (i = 0; i < this.count(); i++) {
            sum += trials[i];
        }
        return sum / this.count();
    };
    
    Timer.prototype.print = function(element) {
        var text = "Trial: " + last_trial + "ms" +
               "<br />\nTrials: " + this.count() + ", Avg: " + this.average() + "ms";
        if (element) {
            $(element).html(text);
        } else {
            console.log(text);
        }
    };

    var stackFrame = function () {
        this.tmpObj = [];
        this.isLoop = false;
    }

    var Threat = function (block, target) {
        this.nextBlock = block;
        this.firstBlock = block;
        this.stack = [];
        this.stackFrame = [];
        this.target = target;
        this.tmp = null; 
        this.tmpObj = [];
        this.firstTime = true;
        this.paused = false;
    }

    Threat.prototype.peekStackFrame = function () {
        return this.stackFrame[this.stackFrame.length - 1];
    }

    Threat.prototype.pushStackFrame = function () {
        this.stackFrame.push(new stackFrame());
        return this.peekStackFrame();
    }

    Threat.prototype.popStackFrame = function () {
        this.stackFrame.pop();
    }

    var RENDERErXD = function (s, c) {
        this.stage = s;
        this.canvas = c;
        this.scale = 1;
        this.ctx = this.canvas.getContext('2d');
    }

    RENDERErXD.prototype.setScale = function (s) {
        this.scale = s;
        this.canvas.width = 480 * this.scale;
        this.canvas.height = 360 * this.scale;
    }

    RENDERErXD.prototype.draw = function (s, c) {
        var sce = this.stage.sceneXDs[this.stage.sceneId - 1];
        var sceCos = sce.animation[sce.cosId - 1];
        var ctx = this.ctx;
        ctx.save();
        ctx.clearRect(0,0,480 * this.scale,360 * this.scale);
        ctx.scale(this.scale, this.scale)
        ctx.save();
        var _objectScale = 1;
        ctx.translate(240, 180);
        const image = sceCos.image;
        const x = -sceCos.RX * _objectScale | 0;
        const y = -sceCos.RY * _objectScale | 0;
        const w = image.width * _objectScale;
        const h = image.height * _objectScale;
        if (sceCos.loadedImage) {
            ctx.drawImage(image, x, y, w, h);
        }
        ctx.restore();
        for (let index = 0; index < this.stage.children.length; index++) {
            const element = this.stage.children[index];
            if (element.v) {
                var cos = element.spritess.costumes[element.cosid - 1];
                ctx.save();
                var globalScale = 1;
                ctx.translate(((element.mat[0] + 240) * globalScale | 0) / globalScale, ((180 - element.mat[1]) * globalScale | 0) / globalScale);
                let objectScale = 1 / cos.BR;
                if (element.rs === 0) {
                    ctx.rotate((element.mat[2] - 90) * Math.PI / 180);
                } else if (element.rs === 1 && element.mat[2] < 0) {
                    ctx.scale(-1, 1);
                }
                ctx.imageSmoothingEnabled = false;
                objectScale *= (element.mat[3] / 100);
                const image = cos.image;
                const x = -cos.RX * objectScale | 0;
                const y = -cos.RY * objectScale | 0;
                const w = image.width * objectScale;
                const h = image.height * objectScale;
                if (cos.loadedImage) {
                    ctx.drawImage(image, x, y, w, h);
                }
                ctx.restore();
            }
        }
        ctx.restore();
    }

    var AudioXD = function () {
        this.ctx = new AudioContext();
    }

    var BlockXD = function (s, b) {
        this.sp = s;
        this.spript = [];
        for (let index = 0; index < b.length; index++) {
            const element = b[index];
            this.spript.push(BeatOutYTsavePlaylist.makeBlockList(element));
        }
    }

    function moveSpriteTo(s, newX, newY) {
        s.setXY(newX, newY)
    }

    function isWhiteSpace(val) {
        return val === null || (typeof val === 'string' && val.trim().length === 0);
    }

    function compareXD(v1, v2) {
		let n1 = Number(v1);
        let n2 = Number(v2);
        if (n1 === 0 && isWhiteSpace(v1)) {
            n1 = NaN;
        } else if (n2 === 0 && isWhiteSpace(v2)) {
            n2 = NaN;
        }
        if (isNaN(n1) || isNaN(n2)) {
            // At least one argument can't be converted to a number.
            // Scratch compares strings as case insensitive.
            const s1 = String(v1).toLowerCase();
            const s2 = String(v2).toLowerCase();
            if (s1 < s2) {
                return -1;
            } else if (s1 > s2) {
                return 1;
            }
            return 0;
        }
        // Handle the special case of Infinity
        if ((n1 === Infinity && n2 === Infinity) || (n1 === -Infinity && n2 === -Infinity)) {
            return 0;
        }
        // Compare as numbers.
        return n1 - n2;
	}

    var PrimitivesXD = function() {
        this.primTable = {};
        this.primTable['go'] = function(arg, unit) {}
        this.primTable['show'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().setV(true);
        }
        this.primTable['hide'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().setV(false);
        }
        this.primTable['repeat'] = function(b, unit) {
            if (b.tmp == -1) {
                b.tmp = Math.max(BeatOutYTsavePlaylist.numarg(b, 0), 0); // Initialize repeat count on this block
            }
            if (b.tmp > 0) {
                b.tmp -= 1; // decrement count
                BeatOutYTsavePlaylist.startSubstack(b, true);
            } else {
                // Done executing this repeat block for this round
                b.tmp = -1;
                b = null;
            }
        }
        this.primTable['sound'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().startSound(BeatOutYTsavePlaylist.numarg(arg, 0));
        }
        this.primTable['setC'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().setC(BeatOutYTsavePlaylist.numarg(arg, 0));

        }
        this.primTable['wait'] = function(b, unit) {
            if (BeatOutYTsavePlaylist.activeThread.firstTime) {
                BeatOutYTsavePlaylist.startTimer(BeatOutYTsavePlaylist.numarg(b, 0));
            } else {
                BeatOutYTsavePlaylist.checkTimer();
            }
        }
        this.primTable['nextC'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().setC(BeatOutYTsavePlaylist.targetSprite().cosid + 1);
        }
        this.primTable['goto'] = function(arg, unit) {
            BeatOutYTsavePlaylist.targetSprite().setXY(BeatOutYTsavePlaylist.numarg(arg, 0), BeatOutYTsavePlaylist.numarg(arg, 1))
        }
        this.primTable['gide'] = function(b, unit) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            if (s == null) return;
            if (BeatOutYTsavePlaylist.activeThread.firstTime) {
                var secs = BeatOutYTsavePlaylist.numarg(b, 0);
                var destX = BeatOutYTsavePlaylist.numarg(b, 1);
                var destY = BeatOutYTsavePlaylist.numarg(b, 2);
                if (secs <= 0) {
                    moveSpriteTo(s, destX, destY);
                    return;
                }
                // record state: [0]start msecs, [1]duration, [2]startX, [3]startY, [4]endX, [5]endY
                BeatOutYTsavePlaylist.activeThread.tmpObj = [BeatOutYTsavePlaylist.currentMSecs, 1000 * secs, s.mat[0], s.mat[1], destX, destY];
                BeatOutYTsavePlaylist.startTimer(secs);
            } else {
                var state = BeatOutYTsavePlaylist.activeThread.tmpObj;
                if (!BeatOutYTsavePlaylist.checkTimer()) {
                    // in progress: move to intermediate position along path
                    var frac = (BeatOutYTsavePlaylist.currentMSecs - state[0]) / state[1];
                    var newX = state[2] + frac * (state[4] - state[2]);
                    var newY = state[3] + frac * (state[5] - state[3]);
                    moveSpriteTo(s, newX, newY);
                } else {
                    // finished: move to final position and clear state
                    moveSpriteTo(s, state[4], state[5]);
                    BeatOutYTsavePlaylist.activeThread.tmpObj = null;
                }
            }
        }
        this.primTable['DED'] = function(arg, unit) {
            BeatOutYTsavePlaylist.clickPlaylist();
        }
        this.primTable['deleteClone'] = function(arg, unit) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            if (s.isOriginal) return;
            BeatOutYTsavePlaylist.disposeTarget(s);
            BeatOutYTsavePlaylist.stopForTarget(s);
        }
        this.primTable['randow'] = function(b, unit) {
            var n1 = BeatOutYTsavePlaylist.numarg(b, 0);
            var n2 = BeatOutYTsavePlaylist.numarg(b, 1);
            var low = n1 <= n2 ? n1 : n2;
            var hi = n1 <= n2 ? n2 : n1;
            if (low == hi) return low;
            // if both low and hi are ints, truncate the result to an int
            if (Math.floor(low) == low && Math.floor(hi) == hi) {
                return low + Math.floor(Math.random() * (hi + 1 - low));
            }
            return Math.random() * (hi - low) + low;
        }
        this.primTable['setVar'] = function(b) {
            var n = BeatOutYTsavePlaylist.arg(b, 0);
            BeatOutYTsavePlaylist.targetSprite().vars[n] = BeatOutYTsavePlaylist.arg(b, 1);
        }
        this.primTable['changeVar'] = function(b) {
            var n = BeatOutYTsavePlaylist.arg(b, 0);
            BeatOutYTsavePlaylist.targetSprite().vars[n] += BeatOutYTsavePlaylist.arg(b, 1);
        }
        this.primTable['getVar'] = function(b) {
            var n = BeatOutYTsavePlaylist.arg(b, 0);
            return BeatOutYTsavePlaylist.targetSprite().vars[n];
        }
        this.primTable['changeX'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            if (s != null) moveSpriteTo(s, s.mat[0] + BeatOutYTsavePlaylist.numarg(b, 0), s.mat[1]);
        }
        this.primTable['changeY'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            if (s != null) moveSpriteTo(s, s.mat[0], s.mat[1] + BeatOutYTsavePlaylist.numarg(b, 0));
        }
        this.primTable['turn'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            var d = s.mat[2] + BeatOutYTsavePlaylist.numarg(b, 0);
            s.setD(d);
        }
        this.primTable['delete'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            BeatOutYTsavePlaylist.disposeTarget(s);
            BeatOutYTsavePlaylist.stopForTarget(s);
            BeatOutYTsavePlaylist.activeThread = new Threat(null);
        }
        this.primTable['message'] = function(b) {
            BeatOutYTsavePlaylist.broadcast(b, false);
        }
        this.primTable['review'] = function(b) {}
        this.primTable['createClone'] = function(b) {
            var objName = BeatOutYTsavePlaylist.arg(b, 0);
            var proto = null;
            if ('_myself_' == objName) proto = BeatOutYTsavePlaylist.activeThread.target;
            if (!proto) return;
            const newClone = proto.makeClone();
            if (newClone) {
                BeatOutYTsavePlaylist.addTarget(newClone);
                //newClone.goBehindOther(cloneTarget);
            }
            for (const f of BeatOutYTsavePlaylist.targetSprite().spritess.block.spript) {
                if (f.op == "whenClone") {
                    BeatOutYTsavePlaylist.startThreadForClone(f, newClone);
                }
            }
            BeatOutYTsavePlaylist.startThreadForClone();
        }
        this.primTable['whenClone'] = function(b) {}
        this.primTable['stopOther'] = function(b) {
            BeatOutYTsavePlaylist.stopThreadsFor(BeatOutYTsavePlaylist.activeThread.target, true);
        }
        this.primTable['setD'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            s.setD(BeatOutYTsavePlaylist.numarg(b, 0));
        }
        this.primTable['send'] = function(b) {
            BeatOutYTsavePlaylist.buttonClo(BeatOutYTsavePlaylist.arg(b, 0))
        }
        this.primTable['getX'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            return s != null ? s.mat[0] : 0;
        }
        this.primTable['getY'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            return s != null ? s.mat[1] : 0;
        }
        this.primTable['+'] = function(b) {
            return BeatOutYTsavePlaylist.numarg(b, 0) + BeatOutYTsavePlaylist.numarg(b, 1)
        }
        this.primTable['-'] = function(b) {
            return BeatOutYTsavePlaylist.numarg(b, 0) - BeatOutYTsavePlaylist.numarg(b, 1)
        }
        this.primTable['*'] = function(b) {
            return BeatOutYTsavePlaylist.numarg(b, 0) * BeatOutYTsavePlaylist.numarg(b, 1)
        }
        this.primTable['/'] = function(b) {
            return BeatOutYTsavePlaylist.numarg(b, 0) / BeatOutYTsavePlaylist.numarg(b, 1)
        }
        this.primTable['<'] = function(b) {
            return compareXD(BeatOutYTsavePlaylist.arg(b, 0), BeatOutYTsavePlaylist.arg(b, 1)) < 0;
        }
        this.primTable['='] = function(b) {
            return compareXD(BeatOutYTsavePlaylist.arg(b, 0), BeatOutYTsavePlaylist.arg(b, 1)) == 0;
        }
        this.primTable['>'] = function(b) {
            return compareXD(BeatOutYTsavePlaylist.arg(b, 0), BeatOutYTsavePlaylist.arg(b, 1)) > 0;
        }
        this.primTable['&'] = function(b) {
            return BeatOutYTsavePlaylist.arg(b, 0) && BeatOutYTsavePlaylist.arg(b, 1);
        }
        this.primTable['|'] = function(b) {
            return BeatOutYTsavePlaylist.arg(b, 0) || BeatOutYTsavePlaylist.arg(b, 1);
        }
        this.primTable['not'] = function(b) {
            return !BeatOutYTsavePlaylist.arg(b, 0);
        }
        this.primTable['round'] = function(b) {
            return Math.round(BeatOutYTsavePlaylist.numarg(b, 0));
        }
        this.primTable['until'] = function(b) {
            if (!BeatOutYTsavePlaylist.boolarg(b, 0)) BeatOutYTsavePlaylist.startSubstack(b, true);
        }
        this.primTable['if'] = function(b) {
            if (BeatOutYTsavePlaylist.boolarg(b, 0)) BeatOutYTsavePlaylist.startSubstack(b);
        }
        this.primTable['c#'] = function(b) {
            var s = BeatOutYTsavePlaylist.targetSprite();
            return s == null ? 1 : s.cosid;
        }
        //this.primTable['go'] = function(b) {}
        //this.primTable['go'] = function(b) {}
    }

    var BOYSO = function (c) {
        this.children = [];
        this.threats = [];
        this.doRedraw = false;
        this.opCount = 0; // used to benchmark the interpreter
        this.debugOps = false;
        this.debugFunc = null;
        this.opCount2 = 0;
        this.timer = new Timer();
        this.renderer = new RENDERErXD(this, c);
        this.audioXD = new AudioXD(this);
        this.activeThread = null;
        this.buttomsXDs = [];
        this.prims = new PrimitivesXD(this);
        this.sceneId = Math.ceil(Math.random() * 3);
        this.cfgh = new SoundXD({
            audio: 'fe5f3899916bde2a70898faa6a5fa461.wav'
        })
        this.currentMSecs = 0;
        this.sceneXDs = [];
        this.yield = false;
        this.step.bind(this);
        this.start();
        this.loadAllScene();
        this.loadButtonS(1).then((f) => {
            for (var fh of f) {
                fh.stage = this;
            }
            this.buttomsXDs = f;
        })
    }

    BOYSO.prototype.loadAllScene = function (target) {
        for (let index = 0; index < 4; index++) {
            this.loadScene(index + 1).then((f) => {
                f.stage = this;
                this.sceneXDs.push(f);
            })
        }
    }

    BOYSO.prototype.startThreadForClone = function (b, clone) {
        this.threats.push(new Threat(b, clone));
    }

    BOYSO.prototype.addTarget = function (target) {
        this.children.push(target);
    }

    BOYSO.prototype.startSound = function (s) {
        s.play();
    }

    BOYSO.prototype.loadButtonS = function (seas) {
        return fetch('buttoms/buts' + seas + '.json').then((e) => e.json().then((g) => startButtonS(g)));
    }
    BOYSO.prototype.loadScene = function (seas) {
        return fetch('scenesp/scene' + seas + '.json').then((e) => e.json().then((g) => startSceneS(g)));
    }
 
    BOYSO.prototype.stopThreadsFor = function (target) {
        this.stopForTarget(target, this.activeThread);
    }

    BOYSO.prototype.buttonClo = function (name) {
        for (let index = 0; index < this.buttomsXDs.length; index++) {
            const element = this.buttomsXDs[index];
            if (element.name == name) element.clic();
        }
    }
    BOYSO.prototype.stopForTarget = function (target, optThreadException) {
        for (let i = 0; i < this.threats.length; i++) {
            if (this.threats[i] === optThreadException) {
                continue;
            }
            if (this.threats[i].target === target) {
                this.threats[i] = new Threat(null);
            }
        }
    }
    BOYSO.prototype.disposeTarget = function (disposingTarget) {
        this.children = this.children.filter(target => {
            if (disposingTarget !== target) return true;
            // Allow target to do dispose actions.
            target.dispose();
            // Remove from list of targets.
            return false;
        });
    }

    BOYSO.prototype.startThread = function(b, targetObj) {
        this.activeThread = new Threat(b, targetObj);
        this.threats.push(this.activeThread);
    };
    
    BOYSO.prototype.restartThread = function(b, targetObj) {
        // used by broadcast; stop any thread running on b, then start a new thread on b
        var newThread = new Threat(b, targetObj);
        var wasRunning = false;
        for (var i = 0; i < this.threats.length; i++) {
            if (this.threats[i].stack[0] == b) {
                this.threats[i] = newThread;
                wasRunning = true;
            }
        }
        if (!wasRunning) {
            this.threats.push(newThread);
        }
    };
    BOYSO.prototype.isRunning = function(b) {
        for (t in BeatOutYTsavePlaylist.threats) {
            if (BeatOutYTsavePlaylist.threats[t].firstBlock == b) {
                return true;
            }
        }
        return false;
    };
    BOYSO.prototype.broadcast = function(b, waitFlag) {
        var pair;
        if (this.activeThread.firstTime) {
            var receivers = [];
            var msg = String(this.arg(b, 0)).toLowerCase();
            var findReceivers = function(stack, target) {
                if ((stack.op == 'review') && (stack.args[0].toLowerCase() == msg)) {
                    receivers.push([stack, target]);
                }
            }
            this.allStacksDo(findReceivers);
            for (pair in receivers) {
                this.restartThread(receivers[pair][0], receivers[pair][1]);
            }
            if (!waitFlag) return;
            this.activeThread.tmpObj = receivers;
            this.activeThread.firstTime = false;
        }
        var done = true;
        for (pair in this.activeThread.tmpObj) {
            if (this.isRunning(this.activeThread.tmpObj[pair][0])) {
                done = false;
            }
        }
        if (done) {
            this.activeThread.tmpObj = null;
            this.activeThread.firstTime = true;
        } else {
            this.yield = true;
        }
    };

    BOYSO.prototype.allStacksDo = function(f) {
        for (var i = this.children.length-1; i >= 0; i--) {
            var o = this.children[i];
            if ((typeof(o) == 'object') && o.spritess.stage == this.targetSprite().spritess.stage) {
                o.spritess.block.spript.forEach(function(stack) {
                    f(stack, o);
                });
            }
        }
    };

    BOYSO.prototype.start = function (data) {
        setInterval(this.step.bind(this), 33)
    }

    BOYSO.prototype.step = function (data) {
        for (let index = 0; index < this.sceneXDs.length; index++) {
            var g = this.sceneXDs[index];
            g.step();
        }
        this.currentMSecs = Date.now();
        var threadStopped = false;
        for (let index = 0; index < this.threats.length; index++) {
            var threat = this.activeThread = this.threats[index];
            if (threat.isDone) continue;
            this.stepActiveThreat();
            if (!this.activeThread || this.activeThread.nextBlock == null) {
                threadStopped = true;
            }
        }
        if (threadStopped) {
            var newThreads = [];
            for (let index = 0; index < this.threats.length; index++) {
                var threat = this.threats[index];
                if (threat.nextBlock != null) {
                    newThreads.push(threat);
                } 
            }
            this.threats = newThreads;
        }
        this.renderer.draw();
    }

    BOYSO.prototype.stepActiveThreat = function () {
        if (typeof(this.activeThread) == 'undefined') {
            return;
        }
        var b = this.activeThread.nextBlock;
        if (b == null) return;
        this.yield = false;
        while (true) {
            if (this.activeThread.paused) return;
    
            ++this.opCount;
            // Advance the "program counter" to the next block before running the primitive.
            // Control flow primitives (e.g. if) may change activeThread.nextBlock.
            this.activeThread.nextBlock = b.nextBlock;
            if (this.debugOps && this.debugFunc) {
                var finalArgs = [];
                for (var i = 0; i < b.args.length; ++i) {
                    finalArgs.push(this.arg(b, i));
                }
    
                this.debugFunc(this.opCount2, b.op, finalArgs);
                ++this.opCount2;
            }
            b.primFcn(b);
            if (this.yield) { this.activeThread.nextBlock = b; return; }
            b = this.activeThread.nextBlock; // refresh local variable b in case primitive did some control flow
            while (!b) {
                // end of a substack; pop the owning control flow block from stack
                // Note: This is a loop to handle nested control flow blocks.
    
                // yield at the end of a loop or when stack is empty
                if (this.activeThread.stack.length === 0) {
                    this.activeThread.nextBlock = null;
                    return;
                } else {
                    b = this.activeThread.stack.pop();
                    if (b.isLoop) {
                        this.activeThread.nextBlock = b; // preserve where it left off
                        return;
                    } else {
                        b = b.nextBlock; // skip and continue for non looping blocks
                    }
                }
            }
        }
    }

    BOYSO.prototype.clickPlaylist = function (data) {
        this.sceneXDs[this.sceneId - 1].clickPlaylist();
    }

    BOYSO.prototype.lookupPrim = function (op) {
        var fcn = this.prims.primTable[op];
        if (fcn == null) fcn = function(b) {
            console.log('not implemented: ' + b.op);
        };
        return fcn;
    }


    BOYSO.prototype.makeBlockList = function (blockList) {
        var firstBlock = null, lastBlock = null;
        for (var i = 0; i < blockList.length; i++) {
            var b = new Block(blockList[i], null, this);
            if (firstBlock == null) firstBlock = b;
            if (lastBlock) lastBlock.nextBlock = b;
            lastBlock = b;
        }
        return firstBlock;
    }
    BOYSO.prototype.fixArgs = function (b) {
        var newArgs = [];
        for (var i = 0; i < b.args.length; i++) {
            var arg = b.args[i];
            if (arg && arg.constructor == Array) {
                if ((arg.length > 0) && (arg[0].constructor == Array)) {
                    if (!b.substack) {
                        b.substack = this.makeBlockList(arg);
                    } else {
                        b.substack2 = this.makeBlockList(arg);
                    }
                } else {
                    newArgs.push(new Block(arg));
                }
            } else {
                newArgs.push(arg);
            }
        }
        b.args = newArgs;
    }
    BOYSO.prototype.arg = function(block, index) {
        var arg = block.args[index];
        if ((typeof(arg) == 'object') && (arg.constructor == Block)) {
            ++this.opCount;
            if (this.debugOps && this.debugFunc) {
                var finalArgs = [];
                for (var i = 0; i < arg.args.length; ++i) {
                    finalArgs.push(this.arg(arg, i));
                }
    
                this.debugFunc(this.opCount2, arg.op, finalArgs);
                ++this.opCount2;
            }
            return arg.primFcn(arg); // expression
        }
        return arg;
    };
    
    BOYSO.prototype.numarg = function(block, index) {
        var arg = Number(this.arg(block, index));
        if (arg !== arg) {
            return 0;
        }
        return arg;
    };
    
    BOYSO.prototype.boolarg = function(block, index) {
        var arg = this.arg(block, index);
        if (typeof arg === 'boolean') {
            return arg;
        } else if (typeof arg === 'string') {
            return !(arg === '' || arg === '0' || arg.toLowerCase() === 'false');
        }
        return Boolean(arg);
    };

    BOYSO.prototype.startSubstack = function(b, isLoop, secondSubstack) {
        // Start the substack of a control structure command such as if or forever.
        b.isLoop = !!isLoop;
        this.activeThread.stack.push(b); // remember the block that started the substack
        if (!secondSubstack) {
            this.activeThread.nextBlock = b.substack;
        } else {
            this.activeThread.nextBlock = b.substack2;
        }
    };

    BOYSO.prototype.targetSprite = function() {
        return this.activeThread.target;
    };
    
    // Timer
    BOYSO.prototype.startTimer = function(secs) {
        var waitMSecs = 1000 * secs;
        if (waitMSecs < 0) waitMSecs = 0;
        this.activeThread.tmp = this.currentMSecs + waitMSecs; // end time in milliseconds
        this.activeThread.firstTime = false;
        this.yield = true;
    };
    
    BOYSO.prototype.checkTimer = function() {
        // check for timer expiration and clean up if expired. return true when expired
        if (this.currentMSecs >= this.activeThread.tmp) {
            // time expired
            this.activeThread.tmp = 0;
            this.activeThread.firstTime = true;
            return true;
        } else {
            this.yield = true;
            return false;
        }
    };
    
    BOYSO.prototype.redraw = function() {
        this.doRedraw = true;
    };

    var Block = function(opAndArgs, optionalSubstack, t) {
        this.op = opAndArgs[0];
        this.primFcn = BeatOutYTsavePlaylist.lookupPrim(this.op);
        this.args = opAndArgs.slice(1);
        this.isLoop = false;
        this.substack = optionalSubstack;
        this.subStack2 = null;
        this.nextBlock = null;
        this.tmp = -1;
        BeatOutYTsavePlaylist.fixArgs(this);
    }

    var runSprite = function (blocks, spe) {
        this.spritess = spe;
        this.blocks = blocks;
        this.isOriginal = true;
        this.mat = [0,0,0,0];
        this.vars = {};
        this.cosid = 1;
        this.rs = 0;
        this.v = false;
    }
    runSprite.prototype.dispose = function (blocks, spe) {
        this.spritess.removeClone(this);
    }
    runSprite.prototype.makeClone = function (blocks, spe) {
        //if (!this.runtime.clonesAvailable() || this.isStage) {
        //    return null; // Hit max clone limit, or this is the stage.
        //}
        //this.runtime.changeCloneCounter(1);
        const newClone = this.spritess.createClone();
        newClone.mat[0] = this.mat[0];
        newClone.mat[1] = this.mat[1];
        newClone.mat[2] = this.mat[2];
        newClone.rs = this.rs;
        newClone.v = this.v;
        newClone.mat[3] = this.mat[3];
        newClone.cosid = this.cosid;
        //newClone.rotationStyle = this.rotationStyle;
        return newClone;
    }

    runSprite.prototype.setV = function (s) {
        this.v = s;
    }

    runSprite.prototype.setC = function (s) {
        this.cosid = s;
       if (this.cosid > this.spritess.costumes.length) {
           this.cosid = 1;
       }
    }

    runSprite.prototype.setD = function (s) {
       this.mat[2] = s;
    }

    runSprite.prototype.startSound = function (s) {
        BeatOutYTsavePlaylist.startSound(this.spritess.sound[s - 1]);
    }

    runSprite.prototype.setXY = function (s,k) {
        this.mat[0] = s;
        this.mat[1] = k;
    }

    var CosXD = function (data) {
        this.RX = data.RX;
        this.RY = data.RY;
        this.BR = data.BR;
        this.loadedImage = false;
        this.image = new Image();
        var _this = this;
        this.image.onload = function () {
            _this.loadedImage = true;
        }
        setTimeout(() => {
            this.image.src = ASSETS_BASE + data.scene + ASSETS_SUFFIX;
        });
    }

    var SoundXD = function (data) {
        this.loadedImage = false;
        this.audio = new Audio();
        setTimeout(() => {
            this.audio.src = ASSETS_BASE + data.audio + ASSETS_SUFFIX;
        });
    }
    SoundXD.prototype.play = function() {
        this.audio.currentTime = 0;
        this.audio.play();
    }

    var loadCosX = function (data) {
        var res = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var f = new CosXD(element);
            res.push(f)
        }
        return res;
    }

    var loadSoundX = function (data) {
        var res = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var f = new SoundXD(element);
            res.push(f)
        }
        return res;
    }

    var SpriteXD = function (data, s) {
        this.name = data.name;
        this.costumes = loadCosX(data.costumes);
        this.sound = loadSoundX(data.sound);
        this.mat = data.mat;
        this.stage = s;
        this.cosid = data.cosid;
        this.rs = data.rs;
        this.clones = [];
        this.v = data.vis;
        this.block = new BlockXD(this, data.scripts);
    }

    SpriteXD.prototype.createClone = function () {
        const newClone = new runSprite(this.block, this);
        newClone.isOriginal = this.clones.length === 0;
        this.clones.push(newClone);
        return newClone;
    }

    SpriteXD.prototype.removeClone = function (clone) {
        const cloneIndex = this.clones.indexOf(clone);
        if (cloneIndex >= 0) {
            this.clones.splice(cloneIndex, 1);
        }
    }

    SpriteXD.prototype.clearClone = function () {
        var fdg = [];
        for (var f of this.clones) {
            fdg.push(f);
        }
        for (let index = 0; index < fdg.length; index++) {
            const element = fdg[index];
            BeatOutYTsavePlaylist.stopForTarget(element);
            BeatOutYTsavePlaylist.disposeTarget(element);
        }
    }

    var HiSceneS = function (data) {
        this.animation = loadCosX(data.animation);
        this.cosId = 1;
        this.cl = false;
        this.tmp = [0,0,0,0,0,0];
        this.SavePlaylist = data.SavePlaylist;
        this.SavePlaylistAnimation = data.SavePlaylistAnimation;
    }

    HiSceneS.prototype.step = function () {
        if (this.cl) {
            if (this.tmp[0] == 1) {
                this.tmp[1] -= 1;
                if (this.tmp[1] < 0) {
                    this.tmp[0] = 2;
                    this.cosId = this.SavePlaylistAnimation.timeEndStart;
                }
            }
            if (this.tmp[0] == 2) {
                this.cosId += 1;
                if (this.cosId == this.SavePlaylistAnimation.timeEnd) {
                    this.cl = false;
                }
            }
            if (this.tmp[0] == 0) {
                if (this.cosId == this.SavePlaylistAnimation.start) {
                    this.tmp[0] = 1;
                    this.tmp[1] = this.SavePlaylistAnimation.timeHidden;
                } else {
                    this.cosId += 1;
                }
            }
        }
    }

    HiSceneS.prototype.clickPlaylist = function () {
        this.cl = true;
        BeatOutYTsavePlaylist.cfgh.play();
        this.cosId = 1;
        this.tmp = [0,0,0,0,0,0];
    }

    function loadSpriteS(data, s) {
        var res = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var f = new SpriteXD(element, s);
            res.push(f)
        }
        return res;
    }

    var ButtonsXD = function (data) {
        this.name = data.name;
        this.a = document.createElement('a');
        this.a.classList.add('buttonss');
        this.a.href = '#';
        this.a.onclick = (function () {
            this.stage.buttonClo(this.name);
        }).bind(this)
        this.im = document.createElement('img');
        this.im.src = ASSETS_BASE + data.icon + ASSETS_SUFFIX;
        this.a.appendChild(this.im);
        BUTS.appendChild(this.a);

        if (data.sprites && data.sprites.length > 0) {
            this.sprite = loadSpriteS(data.sprites, this);
        }
        
    }

    ButtonsXD.prototype.clic = function () {
        if (this.sprite) {
            this.sprite.forEach((r) => {
                r.clearClone();
            });   
            this.sprite.forEach((r) => {
                var h = r.createClone();
                h.mat[0] = r.mat[0];
                h.mat[1] = r.mat[1];
                h.mat[2] = r.mat[2];
                h.v = r.v;
                h.rs = r.rs;
                h.mat[3] = r.mat[3];
                h.cosid = r.cosid;
                this.stage.addTarget(h);
                for (let index = 0; index < r.block.spript.length; index++) {
                    const element = r.block.spript[index];
                    if (element.op == 'go') {
                        BeatOutYTsavePlaylist.threats.push(new Threat(element, h))
                    }
                }
            });     
        }
    }

    // IO

    var startSceneS = function (data) {
        return new HiSceneS(data);
    }

    var startButtonS = function (data) {
        var re = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            var f = new ButtonsXD(element);
            re.push(f)
        }
        return re;
    }

    window.BOYSP = BeatOutYTsavePlaylist = new BOYSO(SCENE);
}());
