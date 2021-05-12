# from werkzeug.security import generate_password_hash
from app.models import db, User, PC, DM, party, Match


# Adds a demo user, you can add other users here if you want
def seed_users():

    demo = User(firstName='Demo', lastName='Lition', email='demo@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo2 = User(firstName='Demo2', lastName='Lition', email='demo2@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo3 = User(firstName='Demo3', lastName='Lition', email='demo3@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo4 = User(firstName='Demo4', lastName='Lition', email='demo4@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo5 = User(firstName='Demo5', lastName='Lition', email='demo5@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo6 = User(firstName='Demo6', lastName='Lition', email='demo6@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo7 = User(firstName='Demo7', lastName='Lition', email='demo7@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo8 = User(firstName='Demo8', lastName='Lition', email='demo8@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo9 = User(firstName='Demo9', lastName='Lition', email='demo9@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo10 = User(firstName='Demo10', lastName='Lition', email='demo10@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo11 = User(firstName='Demo11', lastName='Lition', email='demo11@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo12 = User(firstName='Demo12', lastName='Lition', email='demo12@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo13 = User(firstName='Demo13', lastName='Lition', email='demo13@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo14 = User(firstName='Demo14', lastName='Lition', email='demo14@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo15 = User(firstName='Demo15', lastName='Lition', email='demo15@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo16 = User(firstName='Demo16', lastName='Lition', email='demo16@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo17 = User(firstName='Demo17', lastName='Lition', email='demo17@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo18 = User(firstName='Demo18', lastName='Lition', email='demo18@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo19 = User(firstName='Demo19', lastName='Lition', email='demo19@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')
    demo20 = User(firstName='Demo20', lastName='Lition', email='demo20@aa.io', city='Fullerton', state='CA', bio="I've never played d&d before but I hear it's fun!", password='password1')

    users = [demo, demo2, demo3, demo4, demo5, demo6, demo7, demo8, demo9, demo10, demo11, demo12, demo13, demo14, demo15, demo16, demo17, demo18, demo19, demo20]

    for user in users:
      db.session.add(user)

    db.session.commit()


def seed_PCs():
    userPC = PC(pcClass='bard', experience='0-1', description='Rezenam, a hyperactive Kenku bartender who values power, is motivated by redemption and is flawed by greed.', groupType='in-person', userId=1)
    userPC2 = PC(pcClass='barbarian', experience='0-1', description='Mafarel, a clumsy Half-Elf tailor who values might, is motivated by guilt and is flawed by arrogance.', groupType='in-person', userId=2)
    userPC3 = PC(pcClass='druid', experience='0-1', description='Apenner, a charismatic Halfling noble who values community, is motivated by justice and is flawed by decadence.', groupType='in-person', userId=3)
    userPC4 = PC(pcClass='fighter', experience='0-1', description='Lached, a stuttering Human commoner who values open-mindedness, is motivated by altruism and is flawed by a secret crime.', groupType='in-person', userId=4)
    userPC5 = PC(pcClass='cleric', experience='0-1', description='Sifaress, a fidgeting Gnome cobbler who values knowledge, is motivated by their compatriots and is flawed by decadence.', groupType='in-person', userId=5)
    userPC6 = PC(pcClass='wizard', experience='0-1', description='Nazen, a soft-spoken Firbolg wizard who values national heritage, is motivated by redemption and is flawed by decadence.', groupType='in-person', userId=6)
    userPC7 = PC(pcClass='monk', experience='0-1', description='Lajen, a word-fumbling Half-Orc smith who values fairness, is motivated by a special keepsake and is flawed by arrogance.', groupType='in-person', userId=7)
    userPC8 = PC(pcClass='paladin', experience='0-1', description='Pajen, a stuttering Human paladin who values freedom, is motivated by ambition and is flawed by a secret crime.', groupType='in-person', userId=8)
    userPC9 = PC(pcClass='sorcerer', experience='0-1', description='Fashen, a soft-spoken Goliath sorcerer who values redemption, is motivated by sadism and is flawed by romantic susceptibility.', groupType='in-person', userId=9)
    userPC10 = PC(pcClass='warlock', experience='0-1', description='Pashenic, a doomsaying Dragonborn serial killer who values discovery, is motivated by their compatriots and is flawed by a secret crime.', groupType='in-person', userId=10)
    userPC11 = PC(pcClass='ranger', experience='0-1', description='Jomorac, a soft-spoken Tiefling ranger who values suspicious, is motivated by their compatriots and is flawed by romantic susceptibility.', groupType='remote', userId=11)
    userPC12 = PC(pcClass='rogue', experience='0-1', description='Tazenam, a self-important Revenant rogue who values aspiration, is motivated by guilt and is flawed by possession of forbidden knowledge.', groupType='remote', userId=12)
    userPC13 = PC(pcClass='bard', experience='0-1', description='Lacheder, a fidgeting Gnome village idiot who values might, is motivated by ambition and is flawed by a scandalous history.', groupType='remote', userId=13)
    userPC14 = PC(pcClass='fighter', experience='0-1', description='Pamoror, a word-fumbling Tabaxi fighter who values aspiration, is motivated by a benefactor and is flawed by envy.', groupType='remote', userId=14)
    userPC15 = PC(pcClass='wizard', experience='0-1', description='Ofar, a loud-speaking Goblin wizard who values freedom, is motivated by family and is flawed by a scandalous history.', groupType='remote', userId=15)
    userPC16 = PC(pcClass='cleric', experience='0-1', description='Ashenam, a suspicious Tabaxi baker who values independence, is motivated by ambition and is flawed by envy.', groupType='remote', userId=16)
    userPC17 = PC(pcClass='barbarian', experience='0-1', description='Madelless, a cantankerous Minotaur cobbler who values glory, is motivated by revenge and is flawed by possession of forbidden knowledge.', groupType='remote', userId=17)
    userPC18 = PC(pcClass='warlock', experience='0-1', description='Kiturac, a squinting Half-Orc commoner who values redemption, is motivated by justice and is flawed by envy.', groupType='remote', userId=18)
    userPC19 = PC(pcClass='monk', experience='0-1', description='Kisarkel, a suspicious Dragonborn monk who values national heritage, is motivated by a valuable possession and is flawed by decadence.', groupType='remote', userId=19)
    userPC20 = PC(pcClass='ranger', experience='0-1', description='Silimal, a charismatic Gnome ranger who values community, is motivated by ambition and is flawed by a specific phobia.', groupType='remote', userId=20)

    pcs = [userPC, userPC2, userPC3, userPC4, userPC5, userPC6, userPC7, userPC8, userPC9, userPC10, userPC11, userPC12, userPC13, userPC14, userPC15, userPC16, userPC17, userPC18, userPC19, userPC20]

    db.session.add_all(pcs)
    db.session.commit()


def seed_DMs():
    userDM = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=1)
    userDM2 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=2)
    userDM3 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=3)
    userDM4 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=4)
    userDM5 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=5)
    userDM6 = DM(campaign='homebrew', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=6)
    userDM7 = DM(campaign='homebrew', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=7)
    userDM8 = DM(campaign='homebrew', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=8)
    userDM9 = DM(campaign='homebrew', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=9)
    userDM10 = DM(campaign='homebrew', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='in-person', description="We meet every other Saturday at 5pm. Bring snacks and I'll give your character inspiraiton.", userId=10)
    userDM11 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=11)
    userDM12 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=12)
    userDM13 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='novice', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=13)
    userDM14 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=14)
    userDM15 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=15)
    userDM16 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=16)
    userDM17 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='adept', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=17)
    userDM18 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=18)
    userDM19 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=19)
    userDM20 = DM(campaign='Curse of Strahd', resources='PHB, XGE, TCE', experience='master', partySize='4-6', groupType='remote', description="We meet every other Saturday at 5pm. Venmo me $1 and I'll give your character inspiraiton.", userId=20)

    dms = [userDM, userDM2, userDM3, userDM4, userDM5, userDM6, userDM7, userDM8, userDM9, userDM10, userDM11, userDM12, userDM13, userDM14, userDM15, userDM16, userDM17, userDM18, userDM19, userDM20]

    db.session.add_all(dms)
    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_PCs():
    db.session.execute('TRUNCATE PCs RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_DMs():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
