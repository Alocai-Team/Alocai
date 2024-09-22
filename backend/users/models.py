from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager

# Create your models here.

class User(AbstractBaseUser, PermissionsMixin):
    name= models.CharField(_("Nome Completo"), max_length=250)
    email = models.EmailField(_("Email"), max_length=254, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
    @property
    def get_full_name(self):
        return f"{self.name}"
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='users_user_groups',  # Nome exclusivo
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='users_user_permissions',  # Nome exclusivo
        blank=True,
    )
    